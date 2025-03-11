from modelscope.outputs import OutputKeys
from modelscope.pipelines import pipeline
from modelscope.utils.constant import Tasks

# pip install kantts -f https://modelscope.oss-cn-beijing.aliyuncs.com/releases/repo.html
# pip install pytorch_wavelets tensorboardX scipy==1.12.0


def get_tts_model():
    """初始化并获取TTS语音合成模型
    
    Returns:
        Any: 返回加载好的Sambert-Hifigan语音合成模型管道
    Raises:
        Exception: 模型加载失败时可能抛出异常
    """
    model_id = "damo/speech_sambert-hifigan_tts_zhisha_zh-cn_16k"
    sambert_hifigan_tts = pipeline(task=Tasks.text_to_speech, model=model_id)
    return sambert_hifigan_tts


def gen_tts_wav(sambert_hifigan_tts, text, wav_path):


    """生成TTS语音文件
    
    Args:
        sambert_hifigan_tts (Any): 语音合成模型管道
        text (str): 需要合成的文本内容
        wav_path (str): 输出音频文件路径
        
    Raises:
        IOError: 文件写入失败时可能抛出异常
        ValueError: 输入文本过长或格式不正确时可能抛出异常
    """
    print(f"gerning tts for {wav_path} ....")
    output = sambert_hifigan_tts(input=text)
    wav = output[OutputKeys.OUTPUT_WAV]
    with open(wav_path, "wb") as f:
        f.write(wav)
    print(f"gen tts for {wav_path} done!....")
