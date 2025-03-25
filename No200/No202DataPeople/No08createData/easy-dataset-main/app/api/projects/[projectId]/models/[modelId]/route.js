import { NextResponse } from 'next/server';
import { getProjectRoot } from '@/lib/db/base';
import path from 'path';
import fs from 'fs/promises';

export async function GET(request, { params }) {
  try {
    const { projectId, modelId } = params;
    
    // 验证项目ID和模型ID
    if (!projectId || !modelId) {
      return NextResponse.json({ error: '参数不完整' }, { status: 400 });
    }
    
    // 获取项目根目录
    const projectRoot = await getProjectRoot();
    const projectPath = path.join(projectRoot, projectId);
    
    // 检查项目是否存在
    try {
      await fs.access(projectPath);
    } catch (error) {
      return NextResponse.json({ error: '项目不存在' }, { status: 404 });
    }
    
    // 获取模型配置文件路径
    const modelConfigPath = path.join(projectPath, 'model-config.json');
    
    // 检查模型配置文件是否存在
    try {
      await fs.access(modelConfigPath);
    } catch (error) {
      return NextResponse.json({ error: '模型配置不存在' }, { status: 404 });
    }
    
    // 读取模型配置文件
    const modelConfigData = await fs.readFile(modelConfigPath, 'utf-8');
    const modelConfig = JSON.parse(modelConfigData);
    
    // 查找指定ID的模型
    const model = modelConfig.find(model => model.id === modelId);
    
    if (!model) {
      return NextResponse.json({ error: '模型不存在' }, { status: 404 });
    }
    
    return NextResponse.json(model);
  } catch (error) {
    console.error('获取模型出错:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { projectId, modelId } = params;
    
    // 验证项目ID和模型ID
    if (!projectId || !modelId) {
      return NextResponse.json({ error: '参数不完整' }, { status: 400 });
    }
    
    // 获取请求体
    const modelData = await request.json();
    
    // 验证请求体
    if (!modelData || !modelData.provider || !modelData.name) {
      return NextResponse.json({ error: '模型数据不完整' }, { status: 400 });
    }
    
    // 获取项目根目录
    const projectRoot = await getProjectRoot();
    const projectPath = path.join(projectRoot, projectId);
    
    // 检查项目是否存在
    try {
      await fs.access(projectPath);
    } catch (error) {
      return NextResponse.json({ error: '项目不存在' }, { status: 404 });
    }
    
    // 获取模型配置文件路径
    const modelConfigPath = path.join(projectPath, 'model-config.json');
    
    // 读取模型配置文件
    let modelConfig = [];
    try {
      const modelConfigData = await fs.readFile(modelConfigPath, 'utf-8');
      modelConfig = JSON.parse(modelConfigData);
    } catch (error) {
      // 如果文件不存在，创建一个空数组
    }
    
    // 更新模型数据
    const modelIndex = modelConfig.findIndex(model => model.id === modelId);
    
    if (modelIndex >= 0) {
      // 更新现有模型
      modelConfig[modelIndex] = {
        ...modelConfig[modelIndex],
        ...modelData,
        id: modelId // 确保ID不变
      };
    } else {
      // 添加新模型
      modelConfig.push({
        ...modelData,
        id: modelId
      });
    }
    
    // 写入模型配置文件
    await fs.writeFile(modelConfigPath, JSON.stringify(modelConfig, null, 2), 'utf-8');
    
    return NextResponse.json({ message: '模型已更新' });
  } catch (error) {
    console.error('更新模型出错:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { projectId, modelId } = params;
    
    // 验证项目ID和模型ID
    if (!projectId || !modelId) {
      return NextResponse.json({ error: '参数不完整' }, { status: 400 });
    }
    
    // 获取项目根目录
    const projectRoot = await getProjectRoot();
    const projectPath = path.join(projectRoot, projectId);
    
    // 检查项目是否存在
    try {
      await fs.access(projectPath);
    } catch (error) {
      return NextResponse.json({ error: '项目不存在' }, { status: 404 });
    }
    
    // 获取模型配置文件路径
    const modelConfigPath = path.join(projectPath, 'model-config.json');
    
    // 检查模型配置文件是否存在
    try {
      await fs.access(modelConfigPath);
    } catch (error) {
      return NextResponse.json({ error: '模型配置不存在' }, { status: 404 });
    }
    
    // 读取模型配置文件
    const modelConfigData = await fs.readFile(modelConfigPath, 'utf-8');
    let modelConfig = JSON.parse(modelConfigData);
    
    // 过滤掉要删除的模型
    const initialLength = modelConfig.length;
    modelConfig = modelConfig.filter(model => model.id !== modelId);
    
    // 检查是否找到并删除了模型
    if (modelConfig.length === initialLength) {
      return NextResponse.json({ error: '模型不存在' }, { status: 404 });
    }
    
    // 写入模型配置文件
    await fs.writeFile(modelConfigPath, JSON.stringify(modelConfig, null, 2), 'utf-8');
    
    return NextResponse.json({ message: '模型已删除' });
  } catch (error) {
    console.error('删除模型出错:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
