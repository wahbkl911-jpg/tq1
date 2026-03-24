#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI智能体技能平台 - 30秒宣传视频生成脚本
使用moviepy生成专业宣传视频
"""

from moviepy.editor import *
from moviepy.video.fx.all import fadein, fadeout
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import os

# 视频配置
VIDEO_WIDTH = 1920
VIDEO_HEIGHT = 1080
FPS = 30
DURATION = 30  # 30秒

# 颜色配置
COLOR_BG = (26, 26, 46)  # 深蓝背景 #1a1a2e
COLOR_GOLD = (212, 165, 116)  # 金色 #d4a574
COLOR_WHITE = (255, 255, 255)
COLOR_BLUE = (79, 172, 254)  # 科技蓝

def create_gradient_background(width, height, color1, color2):
    """创建渐变背景"""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    for y in range(height):
        r = int(color1[0] + (color2[0] - color1[0]) * y / height)
        g = int(color1[1] + (color2[1] - color1[1]) * y / height)
        b = int(color1[2] + (color2[2] - color1[2]) * y / height)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    return np.array(img)

def create_text_frame(text, size=80, color=COLOR_GOLD, bg_color=COLOR_BG, alpha=255):
    """创建文字帧"""
    img = Image.new('RGBA', (VIDEO_WIDTH, VIDEO_HEIGHT), (*bg_color, 255))
    draw = ImageDraw.Draw(img)
    
    # 尝试使用系统字体
    try:
        font = ImageFont.truetype("C:/Windows/Fonts/simhei.ttf", size)
    except:
        try:
            font = ImageFont.truetype("C:/Windows/Fonts/msyh.ttc", size)
        except:
            font = ImageFont.load_default()
    
    # 计算文字位置（居中）
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (VIDEO_WIDTH - text_width) // 2
    y = (VIDEO_HEIGHT - text_height) // 2
    
    # 绘制发光效果
    for offset in range(10, 0, -2):
        glow_color = (*color, 30)
        draw.text((x, y), text, font=font, fill=glow_color)
    
    # 绘制主文字
    draw.text((x, y), text, font=font, fill=(*color, alpha))
    
    return np.array(img.convert('RGB'))

def create_particle_background():
    """创建粒子背景效果"""
    img = Image.new('RGB', (VIDEO_WIDTH, VIDEO_HEIGHT), COLOR_BG)
    draw = ImageDraw.Draw(img)
    
    # 绘制随机粒子
    np.random.seed(42)
    for _ in range(100):
        x = np.random.randint(0, VIDEO_WIDTH)
        y = np.random.randint(0, VIDEO_HEIGHT)
        size = np.random.randint(2, 6)
        opacity = np.random.randint(50, 200)
        color = (*COLOR_GOLD, opacity)
        draw.ellipse([x-size, y-size, x+size, y+size], fill=COLOR_GOLD)
    
    return np.array(img)

def create_chart_animation():
    """创建图表动画帧"""
    frames = []
    for i in range(30):  # 1秒动画
        img = Image.new('RGB', (VIDEO_WIDTH, VIDEO_HEIGHT), COLOR_BG)
        draw = ImageDraw.Draw(img)
        
        # 绘制柱状图动画
        bar_width = 60
        gap = 40
        start_x = 400
        base_y = 600
        max_height = 300
        
        data = [0.3, 0.5, 0.8, 0.6, 0.9, 0.7, 0.4]
        progress = (i + 1) / 30
        
        for idx, value in enumerate(data):
            height = int(value * max_height * progress)
            x = start_x + idx * (bar_width + gap)
            y = base_y - height
            
            # 柱状图渐变效果
            for h in range(height):
                color_ratio = h / height
                r = int(COLOR_GOLD[0] * (1 - color_ratio) + COLOR_BLUE[0] * color_ratio)
                g = int(COLOR_GOLD[1] * (1 - color_ratio) + COLOR_BLUE[1] * color_ratio)
                b = int(COLOR_GOLD[2] * (1 - color_ratio) + COLOR_BLUE[2] * color_ratio)
                draw.line([(x, base_y - h), (x + bar_width, base_y - h)], fill=(r, g, b))
        
        frames.append(np.array(img))
    
    return frames

def create_network_graph():
    """创建知识图谱网络动画"""
    frames = []
    np.random.seed(123)
    
    # 节点位置
    center = (VIDEO_WIDTH // 2, VIDEO_HEIGHT // 2)
    nodes = [center]
    for i in range(6):
        angle = 2 * np.pi * i / 6
        radius = 250
        x = int(center[0] + radius * np.cos(angle))
        y = int(center[1] + radius * np.sin(angle))
        nodes.append((x, y))
    
    for frame_idx in range(30):  # 1秒动画
        img = Image.new('RGB', (VIDEO_WIDTH, VIDEO_HEIGHT), COLOR_BG)
        draw = ImageDraw.Draw(img)
        
        progress = (frame_idx + 1) / 30
        visible_nodes = int(1 + 6 * progress)
        
        # 绘制连线
        for i in range(1, min(visible_nodes, len(nodes))):
            if np.random.random() < progress:
                draw.line([nodes[0], nodes[i]], fill=(100, 100, 120), width=2)
        
        # 绘制节点
        for i in range(min(visible_nodes, len(nodes))):
            x, y = nodes[i]
            size = 30 if i == 0 else 20
            color = COLOR_GOLD if i == 0 else COLOR_BLUE
            
            # 发光效果
            for r in range(size + 10, size, -2):
                alpha = int(50 * (1 - (r - size) / 10))
                glow_color = (*color, alpha)
                draw.ellipse([x-r, y-r, x+r, y+r], fill=(*color,))
            
            draw.ellipse([x-size, y-size, x+size, y+size], fill=color)
        
        frames.append(np.array(img))
    
    return frames

def generate_promo_video():
    """生成完整宣传视频"""
    clips = []
    
    # 第1幕：开场 (0-5秒)
    print("生成第1幕：开场...")
    bg_frame = create_particle_background()
    bg_clip = ImageClip(bg_frame).set_duration(5)
    
    # 标题文字动画
    title_texts = []
    for i in range(5 * FPS):
        alpha = int(255 * min(1, i / (2 * FPS)))  # 2秒淡入
        frame = create_text_frame("AI智能体技能平台", size=100, color=COLOR_GOLD, alpha=alpha)
        title_texts.append(frame)
    
    title_clip = ImageSequenceClip(title_texts, fps=FPS).set_duration(5)
    scene1 = CompositeVideoClip([bg_clip, title_clip])
    clips.append(scene1)
    
    # 第2幕：核心功能展示 (5-15秒)
    print("生成第2幕：核心功能展示...")
    chart_frames = create_chart_animation()
    chart_clip = ImageSequenceClip(chart_frames, fps=FPS).set_duration(3)
    
    # 添加文字说明
    func_text = create_text_frame("智能问答 · 数据洞察", size=60, color=COLOR_WHITE)
    func_clip = ImageClip(func_text).set_duration(3).set_position(('center', 200))
    
    scene2_bg = ImageClip(create_gradient_background(VIDEO_WIDTH, VIDEO_HEIGHT, COLOR_BG, (20, 20, 40))).set_duration(10)
    scene2 = CompositeVideoClip([scene2_bg, chart_clip.set_start(2), func_clip.set_start(2)])
    scene2 = scene2.fadein(1).fadeout(1)
    clips.append(scene2)
    
    # 第3幕：技能创作 (15-22秒)
    print("生成第3幕：技能创作...")
    skill_bg = ImageClip(create_gradient_background(VIDEO_WIDTH, VIDEO_HEIGHT, (20, 20, 40), COLOR_BG)).set_duration(7)
    skill_text = create_text_frame("技能创作 · 无限可能", size=60, color=COLOR_GOLD)
    skill_text_clip = ImageClip(skill_text).set_duration(7).set_position(('center', 200))
    
    # 技能卡片动画
    skill_frames = []
    for i in range(7 * FPS):
        img = Image.new('RGB', (VIDEO_WIDTH, VIDEO_HEIGHT), (20, 20, 40))
        draw = ImageDraw.Draw(img)
        
        # 绘制技能卡片
        card_width, card_height = 300, 150
        positions = [(400, 400), (800, 400), (1200, 400)]
        
        for idx, (x, y) in enumerate(positions):
            offset = (i / FPS) * 20 * (idx + 1)
            y_offset = int(np.sin(offset) * 10)
            
            # 卡片背景
            draw.rectangle([x, y + y_offset, x + card_width, y + card_height + y_offset], 
                          fill=(40, 40, 60), outline=COLOR_GOLD, width=2)
            
            # 卡片内容
            draw.rectangle([x + 20, y + 20 + y_offset, x + 60, y + 60 + y_offset], fill=COLOR_GOLD)
        
        skill_frames.append(np.array(img))
    
    skill_cards_clip = ImageSequenceClip(skill_frames, fps=FPS).set_duration(7)
    scene3 = CompositeVideoClip([skill_bg, skill_text_clip, skill_cards_clip])
    clips.append(scene3)
    
    # 第4幕：知识图谱 (22-27秒)
    print("生成第4幕：知识图谱...")
    network_frames = create_network_graph()
    network_clip = ImageSequenceClip(network_frames, fps=FPS).set_duration(5)
    
    graph_text = create_text_frame("知识图谱 · 智慧连接", size=60, color=COLOR_WHITE)
    graph_text_clip = ImageClip(graph_text).set_duration(5).set_position(('center', 150))
    
    scene4 = CompositeVideoClip([network_clip, graph_text_clip])
    clips.append(scene4)
    
    # 第5幕：结尾CTA (27-30秒)
    print("生成第5幕：结尾...")
    cta_frames = []
    for i in range(3 * FPS):
        scale = 1 + 0.1 * np.sin(i / FPS * np.pi)
        alpha = int(255 * min(1, i / FPS))
        
        img = Image.new('RGB', (VIDEO_WIDTH, VIDEO_HEIGHT), COLOR_BG)
        draw = ImageDraw.Draw(img)
        
        # Logo圆形
        center = (VIDEO_WIDTH // 2, VIDEO_HEIGHT // 2 - 50)
        radius = int(80 * scale)
        draw.ellipse([center[0] - radius, center[1] - radius, 
                     center[0] + radius, center[1] + radius], 
                    fill=COLOR_GOLD)
        
        cta_frames.append(np.array(img))
    
    cta_clip = ImageSequenceClip(cta_frames, fps=FPS).set_duration(3)
    cta_text = create_text_frame("开启AI智能新时代", size=50, color=COLOR_WHITE)
    cta_text_clip = ImageClip(cta_text).set_duration(3).set_position(('center', VIDEO_HEIGHT - 200))
    
    scene5 = CompositeVideoClip([cta_clip, cta_text_clip])
    scene5 = scene5.fadein(0.5).fadeout(1)
    clips.append(scene5)
    
    # 合并所有场景
    print("合并视频...")
    final_video = concatenate_videoclips(clips, method="compose")
    
    # 添加背景音乐（使用静音，因为无法生成音频）
    # final_video = final_video.set_audio(None)
    
    # 输出视频
    output_path = "c:\\Users\\liuzicong9535\\Desktop\\openclaw_tq\\promo_video.mp4"
    print(f"导出视频到: {output_path}")
    final_video.write_videofile(output_path, fps=FPS, codec='libx264', 
                                audio=False, preset='medium', threads=4)
    
    print("视频生成完成!")
    return output_path

if __name__ == "__main__":
    try:
        output_file = generate_promo_video()
        print(f"\n✅ 宣传视频已生成: {output_file}")
    except Exception as e:
        print(f"\n❌ 生成视频时出错: {e}")
        import traceback
        traceback.print_exc()
