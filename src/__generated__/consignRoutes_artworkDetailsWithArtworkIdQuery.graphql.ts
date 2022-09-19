/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ConsignmentAttributionClass = "LIMITED_EDITION" | "OPEN_EDITION" | "UNIQUE" | "UNKNOWN_EDITION" | "%future added value";
export type consignRoutes_artworkDetailsWithArtworkIdQueryVariables = {
    id?: string | null | undefined;
    externalId?: string | null | undefined;
    sessionID?: string | null | undefined;
    artworkId: string;
};
export type consignRoutes_artworkDetailsWithArtworkIdQueryResponse = {
    readonly submission: {
        readonly externalId: string;
        readonly artist: {
            readonly internalID: string;
            readonly name: string | null;
        } | null;
        readonly locationCity: string | null;
        readonly locationCountry: string | null;
        readonly locationState: string | null;
        readonly locationPostalCode: string | null;
        readonly locationCountryCode: string | null;
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
        readonly " $fragmentRefs": FragmentRefs<"ArtworkDetails_submission">;
    } | null;
    readonly myCollectionArtworkSubmissionDetails: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkDetails_myCollectionArtworkSubmissionDetails">;
    } | null;
};
export type consignRoutes_artworkDetailsWithArtworkIdQuery = {
    readonly response: consignRoutes_artworkDetailsWithArtworkIdQueryResponse;
    readonly variables: consignRoutes_artworkDetailsWithArtworkIdQueryVariables;
};



/*
query consignRoutes_artworkDetailsWithArtworkIdQuery(
  $id: ID
  $externalId: ID
  $sessionID: String
  $artworkId: String!
) {
  submission(id: $id, externalId: $externalId, sessionID: $sessionID) {
    ...ArtworkDetails_submission
    externalId
    artist {
      internalID
      name
      id
    }
    locationCity
    locationCountry
    locationState
    locationPostalCode
    locationCountryCode
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
    id
  }
  myCollectionArtworkSubmissionDetails: artwork(id: $artworkId) {
    ...ArtworkDetails_myCollectionArtworkSubmissionDetails
    id
  }
}

fragment ArtworkDetails_myCollectionArtworkSubmissionDetails on Artwork {
  internalID
  artist {
    internalID
    name
    id
  }
  location {
    city
    country
    state
    postalCode
    id
  }
  date
  title
  medium
  attributionClass {
    name
    id
  }
  editionNumber
  editionSize
  height
  width
  depth
  metric
  provenance
}

fragment ArtworkDetails_submission on ConsignmentSubmission {
  externalId
  artist {
    internalID
    name
    id
  }
  locationCity
  locationCountry
  locationState
  locationPostalCode
  locationCountryCode
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
}
*/

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
  "name": "id",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "concreteType": "ConsignmentSubmissionCategoryAsset",
  "kind": "LinkedField",
  "name": "assets",
  "plural": true,
  "selections": [
    (v24/*: any*/),
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
v26 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkId"
  }
],
v27 = {
  "alias": null,
  "args": null,
  "concreteType": "Artist",
  "kind": "LinkedField",
  "name": "artist",
  "plural": false,
  "selections": [
    (v6/*: any*/),
    (v7/*: any*/),
    (v24/*: any*/)
  ],
  "storageKey": null
};
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
    "name": "consignRoutes_artworkDetailsWithArtworkIdQuery",
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
          (v25/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkDetails_submission"
          }
        ],
        "storageKey": null
      },
      {
        "alias": "myCollectionArtworkSubmissionDetails",
        "args": (v26/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkDetails_myCollectionArtworkSubmissionDetails"
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
    "name": "consignRoutes_artworkDetailsWithArtworkIdQuery",
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
          (v27/*: any*/),
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
          (v25/*: any*/),
          (v24/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "myCollectionArtworkSubmissionDetails",
        "args": (v26/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          (v27/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Location",
            "kind": "LinkedField",
            "name": "location",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "city",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "country",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "state",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "postalCode",
                "storageKey": null
              },
              (v24/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "date",
            "storageKey": null
          },
          (v14/*: any*/),
          (v15/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AttributionClass",
            "kind": "LinkedField",
            "name": "attributionClass",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              (v24/*: any*/)
            ],
            "storageKey": null
          },
          (v17/*: any*/),
          (v18/*: any*/),
          (v19/*: any*/),
          (v20/*: any*/),
          (v21/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "metric",
            "storageKey": null
          },
          (v23/*: any*/),
          (v24/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "58a84275adef864f2d76fb8c598dddb5",
    "id": null,
    "metadata": {},
    "name": "consignRoutes_artworkDetailsWithArtworkIdQuery",
    "operationKind": "query",
    "text": "query consignRoutes_artworkDetailsWithArtworkIdQuery(\n  $id: ID\n  $externalId: ID\n  $sessionID: String\n  $artworkId: String!\n) {\n  submission(id: $id, externalId: $externalId, sessionID: $sessionID) {\n    ...ArtworkDetails_submission\n    externalId\n    artist {\n      internalID\n      name\n      id\n    }\n    locationCity\n    locationCountry\n    locationState\n    locationPostalCode\n    locationCountryCode\n    year\n    title\n    medium\n    attributionClass\n    editionNumber\n    editionSize\n    height\n    width\n    depth\n    dimensionsMetric\n    provenance\n    assets {\n      id\n      imageUrls\n      geminiToken\n      size\n      filename\n    }\n    id\n  }\n  myCollectionArtworkSubmissionDetails: artwork(id: $artworkId) {\n    ...ArtworkDetails_myCollectionArtworkSubmissionDetails\n    id\n  }\n}\n\nfragment ArtworkDetails_myCollectionArtworkSubmissionDetails on Artwork {\n  internalID\n  artist {\n    internalID\n    name\n    id\n  }\n  location {\n    city\n    country\n    state\n    postalCode\n    id\n  }\n  date\n  title\n  medium\n  attributionClass {\n    name\n    id\n  }\n  editionNumber\n  editionSize\n  height\n  width\n  depth\n  metric\n  provenance\n}\n\nfragment ArtworkDetails_submission on ConsignmentSubmission {\n  externalId\n  artist {\n    internalID\n    name\n    id\n  }\n  locationCity\n  locationCountry\n  locationState\n  locationPostalCode\n  locationCountryCode\n  year\n  title\n  medium\n  attributionClass\n  editionNumber\n  editionSize\n  height\n  width\n  depth\n  dimensionsMetric\n  provenance\n}\n"
  }
};
})();
(node as any).hash = 'e87d9778c53b93b2f0a35b845f7b9265';
export default node;
