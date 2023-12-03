"use strict";

/*
###Задание 1
Создайте обычный объект "Музыкальная коллекция", который можно итерировать. 
Каждая итерация должна возвращать следующий альбом из коллекции. Коллекция 
альбомов - это массив внутри нашего объекта (создать несколько альбомов самому).
Каждый альбом имеет следующую структуру:
{
  title: "Название альбома",
  artist: "Исполнитель",
  year: "Год выпуска"
}
Используйте цикл for...of для перебора альбомов в музыкальной коллекции и 
вывода их в консоль в формате:
"Название альбома - Исполнитель (Год выпуска)"
*/

let musicCollection = [
  {
    title: "Album_1",
    artist: "Artist_1",
    year: "1986"
  },
  {
    title: "Album_2",
    artist: "Artist_1",
    year: "1988"
  },
  {
    title: "Album_1",
    artist: "Artist_2",
    year: "2001"
  },
  {
    title: "Album_1",
    artist: "Artist_3",
    year: "1999"
  }
]

console.log(musicCollection);

let iterableCollection = {
  from: 0,
  to: musicCollection.length,
  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },
  next() {
    return this.current < this.to ? {
      done: false,
      value: musicCollection[this.current++]
    } : { done: true };
  }
}

console.log(iterableCollection);

for (let album of iterableCollection) {
  console.log(`${album.title} - ${album.artist} - ${album.year}`);
}
