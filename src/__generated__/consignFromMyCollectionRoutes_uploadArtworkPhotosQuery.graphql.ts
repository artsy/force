/**
 * @generated SignedSource<<2e5da5e23ea3187f09a19b0a11e9e01a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConsignmentAttributionClass = "LIMITED_EDITION" | "OPEN_EDITION" | "UNIQUE" | "UNKNOWN_EDITION" | "%future added value";
export type consignFromMyCollectionRoutes_uploadArtworkPhotosQuery$variables = {
  artworkId: string;
  externalId?: string | null;
  id?: string | null;
  sessionID?: string | null;
};
export type consignFromMyCollectionRoutes_uploadArtworkPhotosQuery$data = {
  readonly myCollectionArtwork: {
    readonly " $fragmentSpreads": FragmentRefs<"UploadPhotos_myCollectionArtwork">;
  } | null;
  readonly submission: {
    readonly artist: {
      readonly internalID: string;
      readonly name: string | null;
    } | null;
    readonly assets: ReadonlyArray<{
      readonly filename: string | null;
      readonly geminiToken: string | null;
      readonly id: string;
      readonly imageUrls: any | null;
      readonly size: string | null;
    } | null> | null;
    readonly attributionClass: ConsignmentAttributionClass | null;
    readonly depth: string | null;
    readonly dimensionsMetric: string | null;
    readonly editionNumber: string | null;
    readonly editionSize: string | null;
    readonly externalId: string;
    readonly height: string | null;
    readonly locationCity: string | null;
    readonly locationCountry: string | null;
    readonly locationCountryCode: string | null;
    readonly locationPostalCode: string | null;
    readonly locationState: string | null;
    readonly medium: string | null;
    readonly provenance: string | null;
    readonly title: string | null;
    readonly userEmail: string | null;
    readonly userId: string;
    readonly width: string | null;
    readonly year: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"UploadPhotos_submission">;
  } | null;
};
export type consignFromMyCollectionRoutes_uploadArtworkPhotosQuery = {
  response: consignFromMyCollectionRoutes_uploadArtworkPhotosQuery$data;
  variables: consignFromMyCollectionRoutes_uploadArtworkPhotosQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "artworkId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "externalId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sessionID"
},
v4 = [
  {
    "kind": "Variable",
    "name": "externalId",
    "variableName": "externalId"
  },
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
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "externalId",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "locationCity",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "locationCountry",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "locationState",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "locationPostalCode",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "locationCountryCode",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "year",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "medium",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "attributionClass",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "editionNumber",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "editionSize",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "depth",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dimensionsMetric",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "provenance",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "userId",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "userEmail",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "concreteType": "ConsignmentSubmissionCategoryAsset",
  "kind": "LinkedField",
  "name": "assets",
  "plural": true,
  "selections": [
    (v26/*: any*/),
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
},
v28 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkId"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "consignFromMyCollectionRoutes_uploadArtworkPhotosQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UploadPhotos_submission"
          },
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v7/*: any*/)
            ],
            "storageKey": null
          },
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
          (v20/*: any*/),
          (v21/*: any*/),
          (v22/*: any*/),
          (v23/*: any*/),
          (v24/*: any*/),
          (v25/*: any*/),
          (v27/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "myCollectionArtwork",
        "args": (v28/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UploadPhotos_myCollectionArtwork"
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
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "consignFromMyCollectionRoutes_uploadArtworkPhotosQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          (v24/*: any*/),
          (v25/*: any*/),
          (v27/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v7/*: any*/),
              (v26/*: any*/)
            ],
            "storageKey": null
          },
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
          (v20/*: any*/),
          (v21/*: any*/),
          (v22/*: any*/),
          (v23/*: any*/),
          (v26/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "myCollectionArtwork",
        "args": (v28/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "images",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "large"
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:\"large\")"
              }
            ],
            "storageKey": null
          },
          (v26/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8e3881135701fad3bd7a4441d5bf67d6",
    "id": null,
    "metadata": {},
    "name": "consignFromMyCollectionRoutes_uploadArtworkPhotosQuery",
    "operationKind": "query",
    "text": "query consignFromMyCollectionRoutes_uploadArtworkPhotosQuery(\n  $id: ID\n  $externalId: ID\n  $sessionID: String\n  $artworkId: String!\n) {\n  submission(id: $id, externalId: $externalId, sessionID: $sessionID) {\n    ...UploadPhotos_submission\n    externalId\n    artist {\n      internalID\n      name\n      id\n    }\n    locationCity\n    locationCountry\n    locationState\n    locationPostalCode\n    locationCountryCode\n    year\n    title\n    medium\n    attributionClass\n    editionNumber\n    editionSize\n    height\n    width\n    depth\n    dimensionsMetric\n    provenance\n    userId\n    userEmail\n    assets {\n      id\n      imageUrls\n      geminiToken\n      size\n      filename\n    }\n    id\n  }\n  myCollectionArtwork: artwork(id: $artworkId) {\n    ...UploadPhotos_myCollectionArtwork\n    id\n  }\n}\n\nfragment UploadPhotos_myCollectionArtwork on Artwork {\n  internalID\n  images {\n    url(version: \"large\")\n  }\n}\n\nfragment UploadPhotos_submission on ConsignmentSubmission {\n  externalId\n  userId\n  userEmail\n  assets {\n    id\n    imageUrls\n    geminiToken\n    size\n    filename\n  }\n}\n"
  }
};
})();

(node as any).hash = "f9f094a177457dadf3fb78cec944ce87";

export default node;
