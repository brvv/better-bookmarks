type Folder = {
  dateAdded?: Date;
  dateGroupModified?: Date;
  id: string;
  parentId?: string;
  title: string;
};

type Bookmark = {
  dateAdded?: Date;
  dateGroupModified?: Date;
  id: string;
  url?: string;
  parentId?: string;
  title: string;
};

type NewBookmark = {
  parentId: string;
  title?: string;
  url: string;
};
