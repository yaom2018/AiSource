# 负责语音接受语音功能
TTS 文字转语音输出

cd /root/AiSource/No200/No202DataPeople/No004ASR

conda activate streamer-sales-x


echo "正在启动 ASR 服务..."
export MODELSCOPE_CACHE="./weights/asr_weights"
uvicorn asr.asr_server:app --host 0.0.0.0 --port 8003

ssh -p 40018 root@ssh.intern-ai.org.cn -CNg -L 8003:127.0.0.1:8003 -o StrictHostKeyChecking=no