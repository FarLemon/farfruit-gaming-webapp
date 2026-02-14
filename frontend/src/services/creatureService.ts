// src/services/creatureService.ts

import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData
} from "firebase/firestore";

import { dataBase } from "../firebase";

const COLLECTION_NAME = "grounded-creatures";
const DEFAULT_PAGE_SIZE = 25;

/**
 * Represents the Firestore document structure.
 * Firestore is schemaless, so fields are optional.
 */
export interface CreatureDocument {
  name?: string;
  type?: string;
  [key: string]: any;
}

/**
 * Represents the application-level creature model.
 * Includes Firestore document data plus the id.
 */
export interface Creature extends CreatureDocument {
  id: string;
}

interface FetchOptions {
  filterField?: string;
  filterValue?: any;
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null;
  pageSize?: number;
}

/**
 * Fetch creatures with support for:
 * - Filtering
 * - Ordering
 * - Pagination
 * - Error handling
 */
export async function fetchCreatures(
  options?: FetchOptions
): Promise<{
  data: Creature[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
}> {
  try {
    const {
      filterField,
      filterValue,
      lastDoc,
      pageSize = DEFAULT_PAGE_SIZE
    } = options || {};

    const constraints: any[] = [];

    if (filterField === "startsWith" && typeof filterValue === "string" && filterValue.length > 0) {
      const start = filterValue;           // IMPORTANT: keep case, don't force lowercase
      const end = start + "\uf8ff";        // high unicode sentinel

      constraints.push(where("name", ">=", start));
      constraints.push(where("name", "<", end));   // use < (not <=)
    }

    constraints.push(orderBy("name"));
    constraints.push(limit(pageSize));

    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }

    const q = query(
      collection(dataBase, COLLECTION_NAME),
      ...constraints
    );

    const snapshot = await getDocs(q);

    const data: Creature[] = snapshot.docs.map(doc => {
      const docData = doc.data() as CreatureDocument;

      return {
        id: doc.id,
        ...docData
      };
    });

    return {
      data,
      lastVisible:
        snapshot.docs.length > 0
          ? snapshot.docs[snapshot.docs.length - 1]
          : null
    };

  } catch (error) {
    console.error("Firestore service error:", error);
    throw error;
  }
}