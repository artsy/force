/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ConsignmentAttributionClass = "LIMITED_EDITION" | "OPEN_EDITION" | "UNIQUE" | "UNKNOWN_EDITION" | "%future added value";
export type consignRoutes_uploadPhotosQueryVariables = {
    id: string;
    sessionID?: string | null;
};
export type consignRoutes_uploadPhotosQueryResponse = {
    readonly submission: {
        readonly id: string;
        readonly artist: {
            readonly internalID: string;
            readonly name: string | null;
        } | null;
        readonly locationCity: string | null;
        readonly locationCountry: string | null;
        readonly locationState: string | null;
        readonly year: string | null;
        readonly title: string | null;
        readonly medium: string | null;
        readonly attributionClass: ConsignmentAttributionClass | null;
        readonly editionNumber: string | null;
        readonly editionSize: string | null;
        readonly height: string | null;
        readonly width: string | null;
        readonly depth: string | null;
        readonly dimensionsMetric: string | null;
        readonly provenance: string | null;
        readonly assets: ReadonlyArray<{
            readonly id: string;
            readonly imageUrls: unknown | null;
            readonly geminiToken: string | null;
            readonly size: string | null;
            readonly filename: string | null;
        } | null> | null;
        readonly " $fragmentRefs": FragmentRefs<"UploadPhotos_submission">;
    } | null;
};
export type consignRoutes_uploadPhotosQuery = {
    readonly response: consignRoutes_uploadPhotosQueryResponse;
    readonly variables: consignRoutes_uploadPhotosQueryVariables;
};



/*
query consignRoutes_uploadPhotosQuery(
  $id: ID!
  $sessionID: String
) {
  submission(id: $id, sessionID: $sessionID) {
    ...UploadPhotos_submission
    id
    artist {
      internalID
      name
      id
    }
    locationCity
    locationCountry
    locationState
    year
    title
    medium
    attributionClass
    editionNumber
    editionSize
    height
    width
    depth
    dimensionsMetric
    provenance
    assets {
      id
      imageUrls
      geminiToken
      size
      filename
    }
  }
}

fragment UploadPhotos_submission on ConsignmentSubmission {
  id
  assets {
    id
    imageUrls
    geminiToken
    size
    filename
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sessionID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
  {
    "kind": "Variable",
    "name": "sessionID",
    "variableName": "sessionID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "locationCity",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "locationCountry",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "locationState",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "year",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "medium",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "attributionClass",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "editionNumber",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "editionSize",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "depth",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dimensionsMetric",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "provenance",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "concreteType": "ConsignmentSubmissionCategoryAsset",
  "kind": "LinkedField",
  "name": "assets",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "imageUrls",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "geminiToken",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "size",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "filename",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "consignRoutes_uploadPhotosQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          (v15/*: any*/),
          (v16/*: any*/),
          (v17/*: any*/),
          (v18/*: any*/),
          (v19/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UploadPhotos_submission"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "consignRoutes_uploadPhotosQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v19/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          (v15/*: any*/),
          (v16/*: any*/),
          (v17/*: any*/),
          (v18/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ad18861ad60191131ddb2ea00737839a",
    "id": null,
    "metadata": {},
    "name": "consignRoutes_uploadPhotosQuery",
    "operationKind": "query",
    "text": "query consignRoutes_uploadPhotosQuery(\n  $id: ID!\n  $sessionID: String\n) {\n  submission(id: $id, sessionID: $sessionID) {\n    ...UploadPhotos_submission\n    id\n    artist {\n      internalID\n      name\n      id\n    }\n    locationCity\n    locationCountry\n    locationState\n    year\n    title\n    medium\n    attributionClass\n    editionNumber\n    editionSize\n    height\n    width\n    depth\n    dimensionsMetric\n    provenance\n    assets {\n      id\n      imageUrls\n      geminiToken\n      size\n      filename\n    }\n  }\n}\n\nfragment UploadPhotos_submission on ConsignmentSubmission {\n  id\n  assets {\n    id\n    imageUrls\n    geminiToken\n    size\n    filename\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd54f0d48e037030303f4d1ff1e873d2a';
export default node;
