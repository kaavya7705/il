from flask import Flask, render_template, request, jsonify
from langchain.agents import AgentExecutor, create_react_agent
from langchain.tools import StructuredTool
from langchain_groq import ChatGroq
from langchain_community.tools import DuckDuckGoSearchRun
from langchain import hub

from dotenv import load_dotenv
import os
import logging
from functools import lru_cache
from flask_cors import CORS

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

class AIAgentForGovSchemes:
    def __init__(self):
        # Initialize the LLM
        try:
            self.llm = ChatGroq(model='llama-3.3-70b-versatile', groq_api_key=os.getenv("GROQ_API_KEY"))
            logger.info("LLM initialized successfully")
        except Exception as e:
            logger.error(f"Error initializing LLM: {e}")
            raise
        
        # Set up tools
        self.tools = [
            StructuredTool.from_function(
                name='DuckDuckGoSearch',
                func=lambda input, **kwargs: DuckDuckGoSearchRun().run(input),
                description="Searches the internet for government schemes related to a specific industry specialization in India."
            )
        ]
        
        # Pull the ReAct prompt
        react_docstore_prompt = hub.pull("hwchase17/react")
        
        # Create the agent
        agent = create_react_agent(
            llm=self.llm,
            tools=self.tools,
            prompt=react_docstore_prompt
        )
        
        # Initialize the agent executor
        self.main_agent_executor = AgentExecutor.from_agent_and_tools(
            agent=agent,
            tools=self.tools,
            handling_parsing_errors=True,
            verbose=True
        )
    
    @lru_cache(maxsize=32)
    def search_gov_schemes(self, industry_specialization):
        """
        Search for government schemes related to the given industry specialization.
        Using LRU cache to avoid repeated identical searches.Explain every scheme in detail like a professional.
        """
        logger.info(f"Searching for schemes related to: {industry_specialization}")
        try:
            prompt = f"""Provide a comprehensive analysis of all current government schemes available for the {industry_specialization} industry in India. For each scheme, include:

1. Scheme Name: Full official name of the scheme
2. Implementing Ministry/Department: Which government body manages this scheme
3. Objective: The primary goals and purpose of the scheme
4. Key Benefits: Financial incentives, subsidies, tax benefits, or other advantages
5. Eligibility Criteria: Detailed requirements for businesses/individuals to qualify
6. Application Process: Step-by-step procedure to apply, including documentation requirements
7. Timeline: Important dates, deadlines, or duration of the scheme
8. Success Metrics: How the scheme has performed so far with statistics if available
9. Contact Information: Official websites, helpline numbers, and email addresses
10. Recent Updates: Any amendments or changes to the scheme in the past year

Format each scheme clearly with headings and subheadings. Include both central and state-level schemes where applicable. Prioritize schemes that are currently active and accepting applications.
"""

            response = self.main_agent_executor.invoke({"input": prompt})
            return response['output']
        except Exception as e:
            logger.error(f"Error in search_gov_schemes: {e}")
            return f"An error occurred while searching: {str(e)}"

# Initialize the agent as a global variable to reuse it across requests
agent = None

def get_agent():
    global agent
    if agent is None:
        try:
            agent = AIAgentForGovSchemes()
            logger.info("Agent initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize agent: {e}")
            return None
    return agent

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    if request.method == 'POST':
        industry = request.form.get('industry', '')
        if not industry:
            return jsonify({"error": "Please specify an industry"}), 400
        
        agent_instance = get_agent()
        if agent_instance is None:
            return jsonify({"error": "Failed to initialize the AI agent. Please check server logs."}), 500
        
        try:
            result = agent_instance.search_gov_schemes(industry)
            return jsonify({"result": result})
        except Exception as e:
            logger.error(f"Error during search: {e}")
            return jsonify({"error": str(e)}), 500

@app.route('/api/schemes', methods=['GET'])
def api_schemes():
    industry = request.args.get('industry', '')
    if not industry:
        return jsonify({"error": "Please specify an industry parameter"}), 400
    
    agent_instance = get_agent()
    if agent_instance is None:
        return jsonify({"error": "Failed to initialize the AI agent. Please check server logs."}), 500
    
    try:
        result = agent_instance.search_gov_schemes(industry)
        return jsonify({
            "industry": industry,
            "schemes": result
        })
    except Exception as e:
        logger.error(f"Error during API search: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Make sure the templates directory exists
    os.makedirs('templates', exist_ok=True)
    
    # Create the index.html file if it doesn't exist
    if not os.path.exists('templates/index.html'):
        with open('templates/index.html', 'w') as f:
            f.write('''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Indian Government Schemes Finder</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .result-container {
            margin-top: 20px;
            padding: 20px;
            border-radius: 5px;
            background-color: #f8f9fa;
            display: none;
        }
        .loading {
            display: none;
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card shadow">
                    <div class="card-header bg-primary text-white">
                        <h3 class="mb-0">Indian Government Schemes Finder</h3>
                    </div>
                    <div class="card-body">
                        <p class="lead">Search for government schemes by industry or specialization</p>
                        <form id="searchForm">
                            <div class="mb-3">
                                <label for="industry" class="form-label">Industry/Specialization</label>
                                <input type="text" class="form-control" id="industry" name="industry" 
                                       placeholder="e.g. agriculture, textiles, technology, startups">
                            </div>
                            <button type="submit" class="btn btn-primary">Search Schemes</button>
                        </form>
                        
                        <div class="loading" id="loading">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <p class="mt-2">Searching for relevant schemes... This may take a moment.</p>
                        </div>
                        
                        <div class="result-container" id="resultContainer">
                            <h4>Search Results</h4>
                            <div id="results" class="mt-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        document.getElementById('searchForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const industry = document.getElementById('industry').value;
            if (!industry) {
                alert('Please enter an industry or specialization');
                return;
            }
            
            document.getElementById('loading').style.display = 'block';
            document.getElementById('resultContainer').style.display = 'none';
            
            fetch('/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'industry': industry
                })
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('loading').style.display = 'none';
                document.getElementById('resultContainer').style.display = 'block';
                
                if (data.error) {
                    document.getElementById('results').innerHTML = `<div class="alert alert-danger">${data.error}</div>`;
                } else {
                    // Convert newlines to <br> tags for better readability
                    const formattedResult = data.result.replace(/\n/g, '<br>');
                    document.getElementById('results').innerHTML = `<div class="p-3 bg-white border">${formattedResult}</div>`;
                }
            })
            .catch(error => {
                document.getElementById('loading').style.display = 'none';
                document.getElementById('resultContainer').style.display = 'block';
                document.getElementById('results').innerHTML = `<div class="alert alert-danger">An error occurred: ${error}</div>`;
            });
        });
    </script>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
            ''')
    
    # Start the Flask application
    app.run(debug=True, host='0.0.0.0', port=5000)