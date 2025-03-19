# 负责语音接受语音功能
TTS 文字转语音输出

cd /root/AiSource/No200/No202DataPeople/No05LLM

conda activate streamer-sales-x
llm)
        echo "正在启动 LLM 服务..."
        export LMDEPLOY_USE_MODELSCOPE=True
        export MODELSCOPE_CACHE="./weights/llm_weights"
        lmdeploy serve api_server HinGwenWoong/streamer-sales-lelemiao-7b \
                                  --server-port 23333 \
                                  --model-name internlm2 \
                                  --session-len 32768 \
                                  --cache-max-entry-count 0.1 \
                                  --model-format hf
        ;;

    llm-4bit)
        echo "正在启动 LLM-4bit 服务..."
        export LMDEPLOY_USE_MODELSCOPE=True
        export MODELSCOPE_CACHE="./weights/llm_weights"
        lmdeploy serve api_server HinGwenWoong/streamer-sales-lelemiao-7b-4bit \
                                  --server-port 23333 \
                                  --model-name internlm2 \
                                  --session-len 32768 \
                                  --cache-max-entry-count 0.1 \
                                  --model-format awq
        ;;

ssh -p 40018 root@ssh.intern-ai.org.cn -CNg -L 8003:127.0.0.1:8003 -o StrictHostKeyChecking=no