/**
 * 🛑 Nothing in here has anything to do with Remix, it's just a fake database
 */

/**
 * This is just a fake DB table. In a real app you'd be talking to a real db or
 * fetching from an existing API.
 */
const fakeData = {
  nbColumns: 0,

  async getNbColumns(): Promise<number> {
    return fakeData.nbColumns;
  },

  async setNbColumns(nbColumns: number): Promise<null> {
    fakeData.nbColumns = nbColumns;
    return null;
  },
};

export async function getNbColumns() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const nbColumns = await fakeData.getNbColumns();
  return nbColumns;
}

export async function setNbColumns(nbColumns: number) {
  const response = await fakeData.setNbColumns(nbColumns);
  return response;
}
