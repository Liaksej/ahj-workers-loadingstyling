export interface MusicInterface {
  song: string;
  author: string;
  genre: string;
  cover: string;
  received: number;
}

export class Music implements MusicInterface {
  constructor(
    public song: string,
    public author: string,
    public genre: string,
    public cover: string,
    public received: number,
  ) {
    this.song = song;
    this.author = author;
    this.genre = genre;
    this.cover = cover;
    this.received = received;
  }

  protected dateConverter(created: number) {
    const date = new Date(created);

    const formatter = new Intl.DateTimeFormat("ru", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const formattedDateParts = formatter.formatToParts(date);
    return (
      formattedDateParts[6].value +
      ":" +
      formattedDateParts[8].value +
      " " +
      formattedDateParts[0].value +
      "." +
      formattedDateParts[2].value +
      "." +
      formattedDateParts[4].value
    );
  }

  public postMessage() {
    const elementNode = document.querySelector(".skeleton");
    elementNode?.classList.remove("skeleton");

    const datalist = [];

    const date = elementNode?.querySelector(".date");
    datalist.push(date);
    date!.classList.remove("animate-pulse", "bg-gray-200");
    date!.textContent = this.dateConverter(this.received);

    const song = elementNode?.querySelector(".song");
    datalist.push(song);
    song!.textContent = `song: ${this.song}`;

    const author = elementNode?.querySelector(".author");
    datalist.push(author);
    author!.textContent = `author: ${this.author}`;

    const genre = elementNode?.querySelector(".genre");
    datalist.push(genre);
    genre!.textContent = `genre: ${this.genre}`;

    const cover = elementNode?.querySelector(".cover");
    datalist.push(cover);
    cover!.innerHTML = `<img src="${this.cover}" width=100 alt="cover">`;

    datalist.forEach((item) => {
      item?.classList.remove("animate-pulse", "bg-gray-200");
      item?.classList.add("w-fit");
    });
  }
}
