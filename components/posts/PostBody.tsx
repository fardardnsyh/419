import markdownStyles from "./markdown-styles.module.css"

interface PostBodyProps {
  content: string
}

export default function PostBody({ content }: PostBodyProps) {
  return (
    <div
      className={markdownStyles["markdown"]}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
