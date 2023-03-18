import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface PostProps {
  author: Author;
  publisedAt: Date;
  content: Content[];
}

interface Content {
  type: "paragraph" | "link";
  content: string;
}

export function Post({ author, publisedAt, content }: PostProps) {
  const [comments, setComments] = useState(["Post muito bacana hein"]);
  const [newCommentText, setNewCommentText] = useState("");

  const publisedDateFormatted = format(
    publisedAt,
    "d 'de' LLLL 'ás' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publisedDateRelativeNow = formatDistanceToNow(publisedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  function handleNewComentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório");
  }

  function deleteComment(commentToDelete: string) {
    const commentWithoutDeletedOne = comments.filter((commentFilter) => {
      return commentFilter !== commentToDelete;
    });

    setComments(commentWithoutDeletedOne);
  }

  const isNewComentInputEmpty = newCommentText.length === 0;
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfor}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time
          title="{publisedDateFormatted}"
          dateTime="{publisedAt.toISOString()}"
        >
          {publisedDateRelativeNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}
      </div>
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deizxe seu comentario</strong>
        <textarea
          name="comment"
          placeholder="Deixe um comentario"
          value={newCommentText}
          required
          onInvalid={handleNewCommentInvalid}
          onChange={handleNewComentChange}
        />
        <footer>
          <button type="submit" disabled={isNewComentInputEmpty}>
            Comentario
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
