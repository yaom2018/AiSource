1. 切换环境和启动
conda activate streamer-sales-x
cd /root/AiSource/No200/No202DataPeople/

uvicorn No03digitalHuman.digital_human_server:app --host 0.0.0.0 --port 8002 # digital human

2.用到了comfui生成的视频文件：./No51midData/streamer_info_files/lelemiao.mp4

3.方法：/root/AiSource/No200/No202DataPeople/No03digitalHuman/modules/realtime_inference.py中
下载各模型 比如 人脸模型；pose模型等 
保存路径：/root/AiSource/No200/No202DataPeople/weights/digital_human_weights

4.执行接口调用
http://0.0.0.0:8002/digital_human/gen
