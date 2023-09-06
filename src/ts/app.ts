import { catchError, EMPTY, map, throwError } from "rxjs";
import { ajax, AjaxError } from "rxjs/ajax";

import { Music } from "./Music";

interface ServerMusicData {
  song: string;
  author: string;
  genre: string;
  cover: string;
}

interface ServerResponse {
  status: "ok";
  timestamp: number;
  songs: ServerMusicData[];
}

interface MappedResponse {
  timestamp: number;
  songs: ServerMusicData[];
}

if (navigator.serviceWorker) {
  window.addEventListener("load", async () => {
    try {
      if (navigator.serviceWorker) {
        await navigator.serviceWorker.register("./service-worker.js");
        console.log("sw registered");
      }
      // await registration.unregister();
    } catch (e) {
      console.log(e);
    }
  });
}

function app() {
  const fetchUnreadMessages$ = ajax
    .getJSON<ServerResponse>(
      "https://ahj-workers-loadingstyling-server.onrender.com",
    )
    .pipe(
      catchError((err: AjaxError) => {
        console.log("Error", err);
        const mainBlock = document.querySelector(".main-block");
        mainBlock?.classList.add("relative");
        const overlay = document.createElement("div");
        overlay.classList.add(
          "absolute",
          "inset-0",
          "bg-black",
          "bg-opacity-20",
          "flex",
          "items-center",
          "justify-center",
        );

        overlay.innerHTML = `<div class="text-white text-center w-1/2">Не удалось загрузить данные. Проверьте подключение и обновите страницу</div>`;
        mainBlock?.append(overlay);
        if (err.status !== 200) {
          return EMPTY;
        } else {
          return throwError(() => err.name);
        }
      }),
      map((response): MappedResponse => {
        return { timestamp: response.timestamp, songs: response.songs };
      }),
    );

  fetchUnreadMessages$.subscribe((data: MappedResponse) => {
    const timestamp = data.timestamp;
    const songs = data.songs;

    songs.forEach((songData) => {
      const { song, author, genre, cover } = songData;
      const newMessage = new Music(song, author, genre, cover, timestamp);
      newMessage.postMessage();
    });
  });
}

app();
