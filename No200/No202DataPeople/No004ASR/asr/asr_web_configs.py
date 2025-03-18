import os
from dataclasses import dataclass


@dataclass
class WebConfigs:
    """
    项目所有的配置
    """

    # ==================================================================
    #                             服务器文件配置
    # ==================================================================
    SERVER_FILE_ROOT = r"./static"

    # 商品文件
    PRODUCT_FILE_DIR = "product_files"
    INSTRUCTIONS_DIR = "instructions"
    IMAGES_DIR = "images"

    # 数字人文件
    STREAMER_FILE_DIR = "digital_human"
    STREAMER_INFO_FILES_DIR = "streamer_info_files"

    # ASR文件
    ASR_FILE_DIR = "asr"

    # ==================================================================
    #                             JWT 配置
    # ==================================================================

    # JWT Token 加密秘钥，生成命令：openssl rand -hex 32
    TOKEN_JWT_SECURITY_KEY = "b4d77c499c312026406e5c683b6c458ba8ee62b798ab08e145b357b95c0e843b"
    TOKEN_JWT_ALGORITHM = "HS256"

    # ==================================================================
    #                             数据库配置
    # ==================================================================
    POSTGRES_SERVER = os.environ.get("POSTGRES_SERVER", "127.0.0.1")  # 数据库 IP
    POSTGRES_PORT = 5432  # 数据库端口号
    POSTGRES_USER = os.environ.get("POSTGRES_USER", "postgres")  # 数据库用户名
    POSTGRES_PASSWORD = os.environ.get("POSTGRES_PASSWORD", "")  # 数据库密码，自行填写
    POSTGRES_DB = os.environ.get("POSTGRES_DB", "streamer_sales_db")  # 数据库名字

    # ==================================================================
    #                             配置文件路径
    # ==================================================================
    STREAMING_ROOM_CONFIG_PATH = r"./configs/streaming_room_cfg.yaml"  # 直播间信息
    CONVERSATION_MESSAGE_STORE_CONFIG_PATH = r"./configs/conversation_message_store.yaml"  # 对话信息

    CONVERSATION_CFG_YAML_PATH: str = r"./configs/conversation_cfg.yaml"  # 微调数据集生成配置

    # ==================================================================
    #                               组件配置
    # ==================================================================
    ENABLE_RAG: bool = True  # True 启用 RAG 检索增强，False 不启用
    ENABLE_TTS: bool = True  # True 启动 tts，False 不启用
    ENABLE_DIGITAL_HUMAN: bool = True  # True 启动 数字人，False 不启用
    ENABLE_AGENT: bool = os.environ.get("ENABLE_AGENT", "true") == "true"  # True 启动 Agent，False 不启用
    ENABLE_ASR: bool = os.environ.get("ENABLE_ASR", "true") == "true"  # True 启动 语音转文字，False 不启用


    # ==================================================================
    #                              ASR 配置
    # ==================================================================
    ASR_WAV_SAVE_PATH: str = r"./work_dirs/asr_wavs"
    ASR_MODEL_DIR: str = r"./weights/asr_weights/"




# 实例化
WEB_CONFIGS = WebConfigs()
