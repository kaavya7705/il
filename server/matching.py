from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.docstore.document import Document
import pandas as pd 
from langchain_chroma import Chroma 
import os 
from dotenv import load_dotenv

import os
load_dotenv()
os.environ['GOOGLE_API_KEY'] = os.getenv('GOOGLE_API_KEY')


class StoreData:
    
    def __init__(self, data):
        self.df = pd.DataFrame(data)
        self.df['description_and_id'] = self.df[['id','Industry','Description']].apply(lambda x : str(x['id']) + ' ' + x['Industry'] + ' ' + x['Description'], axis = 1)
        self.get_vectorDB()

    def get_vectorDB(self):
        lst = []
        for _, row in self.df.iterrows():
            lst.append(row['description_and_id'])
        documents = [Document(page_content=text) for text in lst]
        self.mentor_db = Chroma.from_documents(documents, embedding = GoogleGenerativeAIEmbeddings(model = 'models/text-embedding-004'))

    def extract_id(self, record):
        return eval(record.split()[0])

    def get_match(self, user_data):
        user_desc = user_data['Industry'] + ' ' + user_data['Description']
        matches = self.mentor_db.similarity_search(
            query = user_desc,
            k = 3
        )
        records = [rec.page_content for rec in matches]
        ids = []
        for rec in records:
            ids.append(self.extract_id(rec))
        matches = self.df[self.df.id.isin(ids)].sort_values('number_of_pupils')

        result = []
        for _, row in matches.iterrows():
            result.append(row.to_dict())
        
        return result