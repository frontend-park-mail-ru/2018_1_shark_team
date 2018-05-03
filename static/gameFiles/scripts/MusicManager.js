"use strict";

const MAIN_CLIP_VOLUME = 0.5;

export default class MusicManager {
    static startMainClip() {
        const clip = document.querySelector(".music-box__clip-1");
        clip.volume = MAIN_CLIP_VOLUME;
        clip.currentTime = 0;
        clip.play();
    }

    static stopMainClip() {
        const clip = document.querySelector(".music-box__clip-1");
        clip.volume = MAIN_CLIP_VOLUME;
        clip.pause();
        clip.currentTime = 0;
    }

    static fireClip() {
        const clip = document.querySelector(".music-box__clip-2");
        clip.volume = 1;
        clip.currentTime = 0;
        clip.play();
    }

    static rocketDeadClip() {
        const clip = document.querySelector(".music-box__clip-3");
        clip.volume = 1;
        clip.currentTime = 0;
        clip.play();
    }
}
