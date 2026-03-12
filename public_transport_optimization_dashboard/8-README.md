#  Public Transport Optimization Dashboard

This project aims to analyze the performance of a city's public bus transport system using synthetic data. It uses core data science tools — **Python**, **Pandas**, **Matplotlib**, and **Seaborn** — to explore and visualize trends related to passenger load, delays, and daily operations.

---

##  Project Structure

public_transport_project/
│
├── data_generation.py # Code to create synthetic transport data
├── transport_data.csv # Cleaned dataset (50 records)
├── eda_analysis.ipynb # Exploratory Data Analysis
├── dashboard_final.ipynb # Visualizations and final dashboard
├── final_dashboard.png # Snapshot of final visual dashboard
└── README.md # Project overview (you’re reading it!)


---

##  Problem Statement

> How can we improve the efficiency and load management of the city's public bus transport system?

Using data on:
- Route timings
- Passenger count
- Bus capacity
- Delay in minutes
- Day of the week

---

##  Final Dashboard Snapshot

[Dashboard](public_transport_final_dashboard.png)

---

##  Key Insights

- **R14** has the highest average delay (11.2 minutes), needs rescheduling
- **Wednesday & Thursday** see the highest trip frequency (10 each)
- **Load Ratio** crosses 1.6 on certain trips → Overcrowding
- Delay of **8 minutes** appears most frequently → Investigate pattern

---

##  Business Suggestions

- Add buffer time or backup buses to routes like **R14**
- Increase bus frequency during **mid-week**
- Optimize scheduling to manage **overcrowding** and **delays**
- Analyze the link between **passenger count** and **delay**

---

##  Tools Used

- Python
- Pandas
- NumPy
- Matplotlib
- Seaborn
- Jupyter Notebook





