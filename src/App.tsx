import { Header } from "./components/Header";
import { Post } from "./components/Post";

import styles from "./App.module.css";

import "./global.css";
import { Sidebar } from "./components/Sidebar";

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/JotaPrimo.png",
      name: "Jota Santos",
      role: "Back",
    },
    content: [
      { type: "paragraph", content: "is a long established" },
      {
        type: "paragraph",
        content:
          "It is a long established fact that a reader will be distracted by the readable",
      },
      { type: "link", content: "#novoprojeto " },
    ],
    publisedAt: new Date("2022-05-03 20:00:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/JotaPrimo.png",
      name: "Jéssica Helena",
      role: "Front",
    },
    content: [
      { type: "paragraph", content: "is a long established" },
      {
        type: "paragraph",
        content:
          "It is a long established fact that a reader will be distracted by the readable",
      },
      { type: "link", content: "#novoprojeto " },
    ],
    publisedAt: new Date("2022-05-13 20:05:45"),
  },
];

function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publisedAt={post.publisedAt}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}

export default App;
