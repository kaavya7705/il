from langchain_groq import ChatGroq
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate, ChatPromptTemplate
import os 
from dotenv import load_dotenv
from flask import Flask, request, jsonify

app = Flask(__name__)


load_dotenv()

def create_chat_bot():
    llm = ChatGroq(model = 'llama-3.3-70b-versatile', groq_api_key = os.getenv('GROQ_API_KEY'))
    System_prompt = '''
    You are a helpful agent employed in rural healthcare center. You are responsible for providing and aiding patients with information about their health and wellness. Answer their queries and provide them with the necessary information to help them make informed decisions about their health.
    Make sure to use layman's term and avoid using medical jargon.
    ** Important **
    You are required to communicate with them in the following language.
    <language>
    {language}
    </language>
    '''
    User_prompt = '''
    Please answer the following patient quert {query}
    '''
    chat_prompt = ChatPromptTemplate.from_messages([
        ('system', System_prompt),
        ('human', User_prompt)
    ]
    )
    output_parser = StrOutputParser()
    chain = chat_prompt | llm | output_parser
    return chain 



@app.route('/chat', methods=['POST', 'GET'])
def chat_with_bot():
    chain = create_chat_bot()
    
    if request.method == 'POST':
        data = request.get_json()
        language = data.get('language', 'en')
        query = data.get('query', '')
    else:  
        language = request.args.get('language', 'en')
        query = request.args.get('query', '')

    response = chain.invoke({'language': language, 'query': query})
    
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)

# chain = create_chat_bot()
# language = input("Enter the language you wish to communicate in: ")
# query = input("Enter the patient query: ")
# response = chat_with_bot(chain, language, query)
# print(response)