export function createPages(pagesCount: number, currentPage: number) {
  let arr: any[] = [];
  let leftPages = pagesCount - currentPage;
  if (pagesCount > 10) {
    if (currentPage > 5 && leftPages > 5) {
      for (let i = currentPage - 4; i <= currentPage + 5; i++) {
        arr.push(i);
        if (i === pagesCount) break;
      }
    } else if (currentPage > 5 && leftPages <= 5) {
      for (let i = pagesCount - 9; i <= pagesCount; i++) {
        arr.push(i);
        if (i === pagesCount) break;
      }
    } else {
      for (let i = 1; i <= 10; i++) {
        arr.push(i);
        if (i === pagesCount) break;
      }
    }
  } else {
    for (let i: number = 1; i <= pagesCount; i++) {
      arr.push(i);
    }
  }
  return arr;
}
