from moviepy.editor import (          # <- correct import
    VideoFileClip,
    AudioFileClip,
    concatenate_audioclips,
    concatenate_videoclips,
)


import sys
import os


iteration = int(sys.argv[1])
clip1 = []
clip2 = []

totalDuration = 0
for index in range(iteration):
    filePath = f"media/{index}.mp4"
    audioPath = f"media/{index}.mp3"
    
    if not os.path.isfile(filePath) or not os.path.isfile(audioPath):
        print(f"File {filePath} or {audioPath} not found.")
        sys.exit(1)
    
    video_clip = VideoFileClip(filePath)
    audio_clip = AudioFileClip(audioPath)
    
    video_clip_duration = video_clip.duration
    audio_clip_duration = audio_clip.duration
    
    min_duration = min(video_clip_duration, audio_clip_duration)
    black = video_clip.subclip(0, min_duration)
    white = audio_clip.subclip(0, min_duration)
    
    clip1.append(black)
    clip2.append(white)
try:
    composite_audio = concatenate_audioclips(clip2)
    print(f"Composite audio duration: {composite_audio.duration}")
    video = concatenate_videoclips(clip1, method="compose")
    video = video.set_audio(composite_audio)
    print(f"Video duration: {video.duration}")
    if video.duration != composite_audio.duration:
        print("Adjusting video duration to match audio duration.")
        video = video.set_duration(composite_audio.duration)

    video.write_videofile("media/finalMovie.mp4", temp_audiofile="temp-audio.m4a", remove_temp=True, codec="libx264", audio_codec="aac", fps=30)

    print("done")

except Exception as e:
    print(f"An error occurred: {e}")
