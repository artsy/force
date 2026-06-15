/**
 * @generated SignedSource<<089b05010771544b1b7d5b02f4749c3f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistStylesAndTechniques_Test_Query$variables = Record<PropertyKey, never>;
export type ArtistStylesAndTechniques_Test_Query$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistStylesAndTechniques_artist">;
  } | null | undefined;
};
export type ArtistStylesAndTechniques_Test_Query = {
  response: ArtistStylesAndTechniques_Test_Query$data;
  variables: ArtistStylesAndTechniques_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "kind": "Literal",
  "name": "minValue",
  "value": 50
},
v2 = {
  "kind": "Literal",
  "name": "size",
  "value": 3
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "internalID",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "slug",
    "storageKey": null
  },
  (v3/*: any*/)
],
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": true,
  "type": "Gene"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistStylesAndTechniques_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistStylesAndTechniques_artist"
          }
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistStylesAndTechniques_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "alias": "movementGenes",
            "args": [
              {
                "kind": "Literal",
                "name": "geneFamilyID",
                "value": "styles-and-movements"
              },
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "concreteType": "Gene",
            "kind": "LinkedField",
            "name": "genes",
            "plural": true,
            "selections": (v4/*: any*/),
            "storageKey": "genes(geneFamilyID:\"styles-and-movements\",minValue:50,size:3)"
          },
          {
            "alias": "mediumGenes",
            "args": [
              {
                "kind": "Literal",
                "name": "geneFamilyID",
                "value": "medium-and-techniques"
              },
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "concreteType": "Gene",
            "kind": "LinkedField",
            "name": "genes",
            "plural": true,
            "selections": (v4/*: any*/),
            "storageKey": "genes(geneFamilyID:\"medium-and-techniques\",minValue:50,size:3)"
          },
          (v3/*: any*/)
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "b8401f39d94c338056dafc65949f6b2d",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artist.id": (v5/*: any*/),
        "artist.mediumGenes": (v6/*: any*/),
        "artist.mediumGenes.id": (v5/*: any*/),
        "artist.mediumGenes.internalID": (v5/*: any*/),
        "artist.mediumGenes.name": (v7/*: any*/),
        "artist.mediumGenes.slug": (v5/*: any*/),
        "artist.movementGenes": (v6/*: any*/),
        "artist.movementGenes.id": (v5/*: any*/),
        "artist.movementGenes.internalID": (v5/*: any*/),
        "artist.movementGenes.name": (v7/*: any*/),
        "artist.movementGenes.slug": (v5/*: any*/)
      }
    },
    "name": "ArtistStylesAndTechniques_Test_Query",
    "operationKind": "query",
    "text": "query ArtistStylesAndTechniques_Test_Query {\n  artist(id: \"example\") {\n    ...ArtistStylesAndTechniques_artist\n    id\n  }\n}\n\nfragment ArtistGenesRow_genes on Gene {\n  internalID\n  name\n  slug\n}\n\nfragment ArtistStylesAndTechniques_artist on Artist {\n  movementGenes: genes(geneFamilyID: \"styles-and-movements\", minValue: 50, size: 3) {\n    ...ArtistGenesRow_genes\n    id\n  }\n  mediumGenes: genes(geneFamilyID: \"medium-and-techniques\", minValue: 50, size: 3) {\n    ...ArtistGenesRow_genes\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "9221f24dcdd237370db4a4afde9b5881";

export default node;
