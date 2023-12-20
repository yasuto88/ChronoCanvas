import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Rating,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { DiaryEntry } from "../../types/interfaces";
import { marked } from "marked";
import DOMPurify from "dompurify";
import "../../styles/github-markdown.css";
import "../../styles/github-markdown-dark.css";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { Client as NotionClient } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

// 日記ページコンポーネント
export default function DiaryPage({
  page,
  content,
}: {
  page: any;
  content: string;
}) {
  const theme = useTheme();
  const { drawerWidth, drawerMobileWidth } = theme.layout;
  const [markdownValue, setMarkdownValue] = useState("");
  const [sanitizedContent, setSanitizedContent] = useState("");

  const title = page.properties?.title?.title[0]?.plain_text ?? "No title";
  const entryDate = page.properties?.entryDate?.date?.start ?? "No date";
  const tags = page.properties?.tags?.multi_select ?? [];
  const studyTime = page.properties?.studyTime?.number ?? 0;
  const focusLevel = page.properties?.focusLevel?.number ?? 0;
  const progressMeter = page.properties?.progressMeter?.number ?? 0;
  const growthIndex = page.properties?.growthIndex?.number ?? 0;
  const stressScale = page.properties?.stressScale?.number ?? 0;

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
        const result = marked.parse(content);
        if (result instanceof Promise) {
          // Promiseを解決する
          parsedMarkdown = await result;
        } else {
          parsedMarkdown = result;
        }
        const html = result instanceof Promise ? await result : result;
        console.log(page.properties.title.title[0].plain_text);
        setSanitizedContent(DOMPurify.sanitize(html));
      } catch (error) {
        console.error("Markdownの解析に失敗しました", error);
      }
    };
    parseMarkdown();
  }, [markdownValue]);

  if (!page) {
    return <p>データを読み込んでいます...</p>;
  }

  return (
    <Box
      sx={{
        marginLeft: `${drawerWidth}px`,
        padding: "80px 16px 16px 16px",
        height: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: (theme) => theme.palette.gradient.primary,
        [theme.breakpoints.down("lg")]: {
          marginLeft: `${drawerMobileWidth}px`,
        },
        [theme.breakpoints.down("sm")]: {
          marginLeft: "0px",
        },
      }}
    >
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {new Date(entryDate).toLocaleDateString()}
          </Typography>
          <Box sx={{ marginTop: 2, display: "flex", gap: 1 }}>
            {tags.map((tag: any) => (
              <Chip label={tag.name} key={tag.id} size="small" />
            ))}
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body2">勉強時間: {studyTime}分</Typography>
            <Typography variant="body2">
              集中度: {page && <Rating value={focusLevel} readOnly />}
            </Typography>
            <Typography variant="body2">
              進捗度: {page && <Rating value={progressMeter} readOnly />}
            </Typography>
            <Typography variant="body2">
              成長指数: {page && <Rating value={growthIndex} readOnly />}
            </Typography>
            <Typography variant="body2">
              ストレスレベル: {page && <Rating value={stressScale} readOnly />}
            </Typography>
          </Box>
          <Box
            // className="dark"
            className={
              theme.palette.mode === "dark"
                ? "markdown-dark-body"
                : "markdown-body"
            }
            data-theme={"dark"}
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
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const pageId = context.params?.pageId as string;
  const notion = new NotionClient({
    auth: process.env.NEXT_PUBLIC_NOTION_TOKEN,
  });
  try {
    // Notion APIを使用してページのデータを取得
    const page = await notion.pages.retrieve({ page_id: pageId });
    //const properties = page.;

    // 必要に応じてMarkdown変換処理を行う
    const n2m = new NotionToMarkdown({ notionClient: notion });
    const mdblocks = await n2m.pageToMarkdown(pageId);
    const content = mdblocks.map((block) => block.parent).join("\n");

    return {
      props: {
        page,
        content,
      },
      revalidate: 10, // ISRの間隔（秒）
    };
  } catch (error) {
    console.error("Error fetching markdown content:", error);
    return {
      props: { content: "Error fetching content" },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      // { params: { pageId: 'c5e6ef2f-92a2-455b-a037-a56a3d34041b' } },
      // 他のページIDもここに追加...
    ],
    fallback: "blocking",
  };
};
