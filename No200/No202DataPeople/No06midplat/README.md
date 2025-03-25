# 中台服务启动

TTS 文字转语音输出

cd /root/AiSource/No200/No202DataPeople

conda activate streamer-sales-x


# Agent Key (如果没有请忽略)
export DELIVERY_TIME_API_KEY="${快递 EBusinessID},${快递 api_key}"
export WEATHER_API_KEY="${天气 API key}"

uvicorn No06midplat.base.base_server:app --host 0.0.0.0 --port 8000 # base: llm + rag + agent

# 出现下面的错误表示需要安装postgres数据
(streamer-sales-x) root@intern-studio-50076254:~/AiSource/No200/No202DataPeople# uvicorn No06midplat.base.base_server:app --host 0.0.0.0 --port 8000 # base: llm + rag + agent
2025-03-19 22:22:56.275 | INFO     | No06midplat.base.database.init_db:<module>:38 - connecting to db: postgresql+psycopg://postgres@127.0.0.1:5432/streamer_sales_db
Traceback (most recent call last):

安装命令：../postgres/README.md

# 创建好数据库后，再次启动服务
uvicorn No06midplat.base.base_server:app --host 0.0.0.0 --port 8000 # base: llm + rag + agentuvicorn No06midplat.base.base_server:app --host 0.0.0.0 --port 8000 # base: llm + rag + agent

# 启动中台是需要启动其他子工程
self check plugins info : 
| llm            | False | 必须
| rag            | True | 不必须
| tts            | False | 必须
| digital hunam  | False | 必须
| asr            | False | 必须
| agent          | False | 不必须