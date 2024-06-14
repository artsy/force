/**
 * @generated SignedSource<<ae65b7d375caaac083ca0f32bd157e56>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetails_SubmissionFlowPrepopulatedTest_Query$variables = {
  artworkId: string;
};
export type ArtworkDetails_SubmissionFlowPrepopulatedTest_Query$data = {
  readonly myCollectionArtwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkDetails_myCollectionArtwork">;
  } | null | undefined;
};
export type ArtworkDetails_SubmissionFlowPrepopulatedTest_Query = {
  response: ArtworkDetails_SubmissionFlowPrepopulatedTest_Query$data;
  variables: ArtworkDetails_SubmissionFlowPrepopulatedTest_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artworkId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkDetails_SubmissionFlowPrepopulatedTest_Query",
    "selections": [
      {
        "alias": "myCollectionArtwork",
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkDetails_myCollectionArtwork"
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
    "name": "ArtworkDetails_SubmissionFlowPrepopulatedTest_Query",
    "selections": [
      {
        "alias": "myCollectionArtwork",
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
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
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "MyLocation",
            "kind": "LinkedField",
            "name": "collectorLocation",
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
              (v4/*: any*/)
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "medium",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkMedium",
            "kind": "LinkedField",
            "name": "mediumType",
            "plural": false,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AttributionClass",
            "kind": "LinkedField",
            "name": "attributionClass",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "editionNumber",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "editionSize",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "height",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "width",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "depth",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "metric",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "provenance",
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8785c1ed93a7ae24a2d7e6a7c55e829a",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "myCollectionArtwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "myCollectionArtwork.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "myCollectionArtwork.artist.id": (v5/*: any*/),
        "myCollectionArtwork.artist.internalID": (v5/*: any*/),
        "myCollectionArtwork.artist.name": (v6/*: any*/),
        "myCollectionArtwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "myCollectionArtwork.attributionClass.id": (v5/*: any*/),
        "myCollectionArtwork.attributionClass.name": (v6/*: any*/),
        "myCollectionArtwork.collectorLocation": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MyLocation"
        },
        "myCollectionArtwork.collectorLocation.city": (v6/*: any*/),
        "myCollectionArtwork.collectorLocation.country": (v6/*: any*/),
        "myCollectionArtwork.collectorLocation.id": (v5/*: any*/),
        "myCollectionArtwork.collectorLocation.postalCode": (v6/*: any*/),
        "myCollectionArtwork.collectorLocation.state": (v6/*: any*/),
        "myCollectionArtwork.date": (v6/*: any*/),
        "myCollectionArtwork.depth": (v6/*: any*/),
        "myCollectionArtwork.editionNumber": (v6/*: any*/),
        "myCollectionArtwork.editionSize": (v6/*: any*/),
        "myCollectionArtwork.height": (v6/*: any*/),
        "myCollectionArtwork.id": (v5/*: any*/),
        "myCollectionArtwork.internalID": (v5/*: any*/),
        "myCollectionArtwork.medium": (v6/*: any*/),
        "myCollectionArtwork.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "myCollectionArtwork.mediumType.name": (v6/*: any*/),
        "myCollectionArtwork.metric": (v6/*: any*/),
        "myCollectionArtwork.provenance": (v6/*: any*/),
        "myCollectionArtwork.title": (v6/*: any*/),
        "myCollectionArtwork.width": (v6/*: any*/)
      }
    },
    "name": "ArtworkDetails_SubmissionFlowPrepopulatedTest_Query",
    "operationKind": "query",
    "text": "query ArtworkDetails_SubmissionFlowPrepopulatedTest_Query(\n  $artworkId: String!\n) {\n  myCollectionArtwork: artwork(id: $artworkId) {\n    ...ArtworkDetails_myCollectionArtwork\n    id\n  }\n}\n\nfragment ArtworkDetails_myCollectionArtwork on Artwork {\n  internalID\n  artist {\n    internalID\n    name\n    id\n  }\n  collectorLocation {\n    city\n    country\n    state\n    postalCode\n    id\n  }\n  date\n  title\n  medium\n  mediumType {\n    name\n  }\n  attributionClass {\n    name\n    id\n  }\n  editionNumber\n  editionSize\n  height\n  width\n  depth\n  metric\n  provenance\n}\n"
  }
};
})();

(node as any).hash = "c1eeec6eea9462ac17150645c68e7a85";

export default node;
