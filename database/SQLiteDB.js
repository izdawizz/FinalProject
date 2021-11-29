import * as SQLite from "expo-sqlite";


/* See https://docs.expo.io/versions/latest/sdk/sqlite/ for SQLite Docs */
// tx.executeSql(sqlStatement, arguments, success(transaction, ResultSet), error(transaction, errorobj))
// create and return db object
const db = SQLite.openDatabase("imgDB", 1.3);
db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () => console.log('Foreign keys turned on'));

export class database {
  static resetTable1() {
    db.transaction((tx) => {
      tx.executeSql("DROP TABLE IF EXISTS ItemDetails;", [],
        () => { console.log("Dropped Tables"); },
        (_, error) => reject(error));
    })
  }
  static resetTable2() {
    db.transaction((tx) => {
      tx.executeSql("  DROP TABLE IF EXISTS RecentItems;", [],
        () => { console.log("Dropped Tables"); },
        (_, error) => reject(error));
    })
  }

  static reset() {
    this.resetTable1();
    this.resetTable2();
  }


  /**
   * Creates a table RecentItems containing:
   * @param rID The Id of the picture
   * @param imageUrl The image URL
   * 
   * Creates a table ItemDetails: 
   * @param itemUrl item url
   * @param itemName product image refers to
   * @param storeName Name of store where said item can be purchased
   * @param price Price of said item
   * @param referenceID Foreignkey referencing table1 rID
   * */
  static dbinit() {
    // console.log("Inside initDB");
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        // console.log("now creating recentitems table");
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS RecentItems (rID INTEGER PRIMARY KEY AUTOINCREMENT, imageUrl TEXT, imgName TEXT)",
          [],
          () => { console.log("Created Table RecentItems"); resolve },
          (_, error) => reject(error)
        );
        // console.log("...finished");
        // console.log("now creating itemdetails table");
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS ItemDetails (iID INTEGER PRIMARY KEY AUTOINCREMENT , itemUrl TEXT, itemName TEXT, storeName TEXT, price REAL, referenceID INTEGER, FOREIGN KEY(referenceID) REFERENCES RecentItems(rID) ON DELETE CASCADE)",
          [],
          () => {
            console.log("Created Table ItemDetails");
            resolve
          },
          (_, error) => reject(error)
        );

        // console.log("...finished");
      });
    });
  }
  static limittrigger() {
    // console.log("Inside initDB");
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TRIGGER recent_limited AFTER INSERT ON RecentItems BEGIN DELETE FROM RecentItems WHERE rID = (SELECT MIN(rID) FROM RecentItems WHERE (SELECT COUNT(*) FROM RecentItems) >= 7); END",
          [],
          () => { console.log("Triggered Limit of Items"); resolve },
          (_, error) => reject(error)
        );
      }
      )
    })
  }

  static insertUrl_RecentItems(imageurl, imgName) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO RecentItems (rID, imageUrl, imgName) values (?,?,?)",
          [null, imageurl, imgName],
          (_, result) => {
            // console.log("Inside insertUrl_RecentItems, inserting...%d", result.insertId)
            resolve(result.insertId)
          },
          (_, error) => reject(error)
        );
      });
    });
  }
  /**
   * Returns the cloudinary link and ID of the image with specified ID, -1 to return all.
   * @param {*} ID 
   * @returns 
   */
  static getRecentItem(ID) {
    if (ID == -1) {
      // console.log("Inside getRecentItem ALL");
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM RecentItems ORDER BY rID DESC LIMIT 10",
            [],
            (_, result) => {
              // console.log(result.rows._array);
              resolve(result.rows._array);
            },
            (_, error) => reject(error)
          );
        });
      });
    }
    if (ID > -1) {
      // console.log("Inside getRecentItem %d", ID);
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM RecentItems WHERE rID =? ORDER BY rID DESC LIMIT 10",
            [ID],
            (_, result) => {
              // console.log(result.rows._array);
              resolve(result.rows._array);
            },
            (_, error) => reject(error)
          );
        });
      });
    }
  }
  static insert_ItemDetails(itemurl, itemname, storename, price, referenceID) {
    // console.log("Inside insertUrl");
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO ItemDetails (iID, itemUrl, itemName, storeName, price, referenceID) values (?,?,?,?,?,?)",
          [null, itemurl, itemname, storename, price, referenceID],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error)
        );
      });
    });
  }
  /**
   * This function takes the ID referencing the RecentItem table and returns rows which correspond to it
   * @param {*} ID (-1 to return all)
   * @returns All columns from both tables
   */
  static getItemDetails(ID) {
    if (ID == -1) {
      // console.log("Inside getitemDetails ALL");
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM ItemDetails INNER JOIN RecentItems ON referenceID=rID ORDER BY referenceID DESC",
            [],
            (_, result) => {
              // console.log(result.rows._array);
              resolve(result.rows._array);
            },
            (_, error) => reject(error)
          );
        });
      });
    }
    if (ID > -1) {
      // console.log("Inside getitemDetails %d", ID);
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM ItemDetails INNER JOIN RecentItems ON referenceID=rID where rID=? ORDER BY referenceID DESC LIMIT 5",
            [ID],
            (_, result) => {
              // console.log(result.rows._array);
              resolve(result.rows._array);
            },
            (_, error) => reject(error)
          );
        });
      });
    }
  }

  /**
   * This version only returns the columns from ItemDetails table:
  * @ iID
  * @ itemUrl
  * @ itemname
  * @ storeName
  * @ price
  * @ referenceID
  * */
  static getItemDetailsv2(ID) {
    if (ID == -1) {
      console.log("Inside getitemDetailsv2 ALL");
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT iID, itemUrl, itemName, storeName, price, referenceID FROM ItemDetails INNER JOIN RecentItems ON referenceID=rID ORDER BY referenceID DESC",
            [],
            (_, result) => {
              // console.log(result.rows._array);
              resolve(result.rows._array);
            },
            (_, error) => reject(error)
          );
        });
      });
    }
    if (ID > -1) {
      console.log("Inside getitemDetailsv2 %d", ID);
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT iID, itemUrl, itemName, storeName, price, referenceID FROM ItemDetails FROM ItemDetails INNER JOIN RecentItems ON referenceID=rID where rID=? ORDER BY referenceID DESC LIMIT 5",
            [ID],
            (_, result) => {
              // console.log(result.rows._array);
              resolve(result.rows._array);
            },
            (_, error) => reject(error)
          );
        });
      });
    }
  }
  /**
   * Cascading Delete of itemDetails and recentImage.
   * @param {ID} ID rID of RecentItem
   */
  static imgDelete(ID) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM RecentItems where rID=?", [ID],
          (_, result) => {
            resolve(result.rowsAffected);
          },
          (_, error) => reject(error)
        );
      });
    });
  }
  /**
   * Pass in ID from RecentImage table, and the imgName you would like to give it.
   * @param {*} ID 
   * @param {*} imgName  
   */
  static update_imgName(ID, imgName) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE RecentItems SET imgName=? WHERE rID=?", [imgName, ID],
          (_, result) => {
            resolve;
          },
          (_, error) => reject(error)
        );
      });
    });
  }
} //database
