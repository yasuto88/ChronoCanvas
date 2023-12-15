import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogTitle,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  List,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";

interface Tag {
  key: string;
  label: string;
  selected: boolean;
}

export default function PostTags() {
  const [open, setOpen] = useState<boolean>(false);
  const [tags, setTags] = useState<Tag[]>([
    {
      key: "React",
      label: "React",
      selected: false,
    },
    {
      key: "TypeScript",
      label: "TypeScript",
      selected: false,
    },
    {
      key: "JavaScript",
      label: "JavaScript",
      selected: false,
    },
    {
      key: "Next.js",
      label: "Next.js",
      selected: false,
    },
  ]);

  const [filteredTags, setFilteredTags] = useState<Tag[]>(tags);

  const handleTagToggle = (index: number) => {
    const newTags = [...filteredTags];
    newTags[index].selected = !newTags[index].selected;
    setTags(newTags);
    setFilteredTags(newTags); // フィルターされたタグも更新する
  };

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = tags.filter((tag) =>
      tag.label.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredTags(filtered);
  };

  return (
    <Stack direction="column" spacing={1} alignItems="start" marginBottom={2}>
      <Button variant="contained" size="small" onClick={() => setOpen(true)}>
        タグ
      </Button>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {tags
          .filter((tag) => tag.selected)
          .map((tag) => (
            <Chip
              key={tag.key}
              label={tag.label}
              size="small"
              sx={{ mt: 1, ml: 1 }} // 上と左にマージンを適用
            />
          ))}
      </Box>

      <TagSelectionDialog
        open={open}
        onClose={() => setOpen(false)}
        tags={filteredTags}
        onTagToggle={handleTagToggle}
        onSearch={handleSearch}
      />
    </Stack>
  );
}

interface TagSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  tags: Tag[];
  onTagToggle: (index: number) => void;
  onSearch: (query: string) => void;
}

const TagSelectionDialog: React.FC<TagSelectionDialogProps> = ({
  open,
  onClose,
  tags,
  onTagToggle,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: "none",
          width: "320px",
          maxHeight: 500,
          height: "auto",
        },
      }}
    >
      <DialogTitle>タグを追加</DialogTitle>
      <TextField
        autoFocus
        margin="dense"
        id="filter"
        label="Filter labels"
        type="text"
        fullWidth
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ width: "90%", mx: "auto", mb: 2 }}
      />
      <List sx={{ pt: 0 }}>
        {tags.map((tag, index) => (
          <ListItem button onClick={() => onTagToggle(index)} key={tag.key}>
            <Checkbox
              edge="start"
              checked={tag.selected}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={tag.label} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};
