import { ThumbsUp, Trash } from "phosphor-react";
import { useState } from "react";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    onDeleteComment(content);
  }

  function handleLikeComment() {
    setLikeCount((state) => {
      return likeCount + 1;
    });
  }

  return (
    <div className={styles.comment}>
      <Avatar
        hasBorder={false}
        alt=""
        src="https://avatars.githubusercontent.com/u/63259982?v=4"
      />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Jota Santos</strong>
              <time title="11 de maio as 8:13" dateTime="2022-05-11">
                Cerca de uma hora atras
              </time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          <p> {content} </p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Apludir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
