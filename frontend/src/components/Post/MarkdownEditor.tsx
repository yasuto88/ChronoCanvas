import React, { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { Box, Card, CardContent } from "@mui/material";
import "../../styles/github-markdown.css";

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

// markedのオプションを設定する
marked.setOptions({});

const MarkdownEditor = () => {
  const [markdownValue, setMarkdownValue] = useState("");
  const [sanitizedContent, setSanitizedContent] = useState("");

  useEffect(() => {
    const parseMarkdown = async () => {
      if (typeof window === "undefined") {
        return;
      }

      marked.setOptions({
        gfm: true,
      });

      let parsedMarkdown;
      try {
        const result = marked.parse(markdownValue);
        if (result instanceof Promise) {
          // Promiseを解決する
          parsedMarkdown = await result;
        } else {
          parsedMarkdown = result;
        }
        const html = result instanceof Promise ? await result : result;
        console.log("Converted HTML:", html);
        setSanitizedContent(DOMPurify.sanitize(html));
      } catch (error) {
        console.error("Markdownの解析に失敗しました", error);
      }
    };
    parseMarkdown();
  }, [markdownValue]);

  const onChange = useCallback(
    (value: string) => {
      console.log("Markdown Value:", value);
      setMarkdownValue(value);
    },
    [] // setMarkdownValueを依存配列に追加
  );

  const autoUploadImage = useMemo(() => {
    return {
      uploadImage: true,
      toolbar: [
        "bold",
        "italic",
        "heading",
        "|",
        "code",
        "quote",
        "|",
        "unordered-list",
        "ordered-list",
        "|",
        "link",
        "image",
        "|",
        "guide",
      ] as unknown as EasyMDE.ToolbarIcon[], // この行を追加
    };
  }, []);

  return (
    <Box>
      <Card variant="outlined">
        <CardContent
          sx={{
            "& .CodeMirror .cm-spell-error:not(.cm-url):not(.cm-comment):not(.cm-tag):not(.cm-word)":
              {
                background: "transparent",
              },
          }}
        >
          <SimpleMdeReact
            value={markdownValue}
            onChange={onChange}
            options={autoUploadImage}
          />
          <Box
            className="markdown-body"
            sx={{
              mt: 2,
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              "& ul ": {
                listStyle: "disc",
              },
              "& ol ": {
                listStyle: "decimal",
              },
            }}
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default MarkdownEditor;
