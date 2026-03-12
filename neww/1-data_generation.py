import pandas as pd 
import numpy as np

def generate_transport_data():
        route= ['R11','R12','R13','R14','R15']
        dates= pd.date_range(start='2025-07-01',periods=10).repeat(5)
        route_id=  route*10
        start_time=['7:00','8:00','9:00','10:00','11:00']*10
        end_time=['7:45','8:45','9:45','10:45','11:45']*10
        passengers=np.random.randint(50,150,size=50)
        capacity=[120,130,90,100,110]*10
        delay_min= np.random.randint(0,21,size=50)
        
        df=pd.DataFrame({
                'Route_ID': route_id,
                'Date': dates,
                'Start_Time': start_time,
                'End_Time': end_time,
                'Passengers':passengers,
                'Bus_Capacity': capacity,
                'Delayed_by_Mins': delay_min
        })
        
        
        df['Day_name'] = df['Date'].dt.day_name()
        df['Day_type'] = df['Day_name'].apply(lambda x: 'Weekend' if x in ['Saturday','Sunday'] else 'Weekday')
        df['Load_ratio'] = (df['Passengers']/df['Bus_Capacity']).round(2)
        df['Trip_ID'] = df['Route_ID'] + '_' + df['Date'].astype(str)+ "_" + df['Start_Time']
        
        return df

if __name__ == '__main__':
        df= generate_transport_data()
        df.to_csv('transport_data.csv',index=False)
        print("Data Saved as transport_data.csv successfully!")