1. 切换环境和启动
conda activate streamer-sales-x
cd /AiSource/No200/No202DataPeople/No03digitalHuman

uvicorn No03digitalHuman.digital_human_server:app --host 0.0.0.0 --port 8002 # digital human