/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkSidebarMetadataTestQueryVariables = {};
export type MyCollectionArtworkSidebarMetadataTestQueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkSidebarMetadata_artwork">;
    } | null;
};
export type MyCollectionArtworkSidebarMetadataTestQuery = {
    readonly response: MyCollectionArtworkSidebarMetadataTestQueryResponse;
    readonly variables: MyCollectionArtworkSidebarMetadataTestQueryVariables;
};



/*
query MyCollectionArtworkSidebarMetadataTestQuery {
  artwork(id: "foo") {
    ...MyCollectionArtworkSidebarMetadata_artwork
    id
  }
}

fragment MyCollectionArtworkSidebarMetadata_artwork on Artwork {
  artistNames
  title
  category
  medium
  dimensions {
    in
    cm
  }
  provenance
  attributionClass {
    shortDescription
    id
  }
  pricePaid {
    display
  }
  artworkLocation
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "foo"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MyCollectionArtworkSidebarMetadataTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MyCollectionArtworkSidebarMetadata_artwork"
          }
        ],
        "storageKey": "artwork(id:\"foo\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MyCollectionArtworkSidebarMetadataTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artistNames",
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
            "name": "category",
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
            "concreteType": "dimensions",
            "kind": "LinkedField",
            "name": "dimensions",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "in",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cm",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "provenance",
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "shortDescription",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "pricePaid",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "display",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artworkLocation",
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "artwork(id:\"foo\")"
      }
    ]
  },
  "params": {
    "cacheID": "9b945b136281bbc6cd4209c7bcf8685a",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.artistNames": (v2/*: any*/),
        "artwork.artworkLocation": (v2/*: any*/),
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v3/*: any*/),
        "artwork.attributionClass.shortDescription": (v2/*: any*/),
        "artwork.category": (v2/*: any*/),
        "artwork.dimensions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "dimensions"
        },
        "artwork.dimensions.cm": (v2/*: any*/),
        "artwork.dimensions.in": (v2/*: any*/),
        "artwork.id": (v3/*: any*/),
        "artwork.medium": (v2/*: any*/),
        "artwork.pricePaid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "artwork.pricePaid.display": (v2/*: any*/),
        "artwork.provenance": (v2/*: any*/),
        "artwork.title": (v2/*: any*/)
      }
    },
    "name": "MyCollectionArtworkSidebarMetadataTestQuery",
    "operationKind": "query",
    "text": "query MyCollectionArtworkSidebarMetadataTestQuery {\n  artwork(id: \"foo\") {\n    ...MyCollectionArtworkSidebarMetadata_artwork\n    id\n  }\n}\n\nfragment MyCollectionArtworkSidebarMetadata_artwork on Artwork {\n  artistNames\n  title\n  category\n  medium\n  dimensions {\n    in\n    cm\n  }\n  provenance\n  attributionClass {\n    shortDescription\n    id\n  }\n  pricePaid {\n    display\n  }\n  artworkLocation\n}\n"
  }
};
})();
(node as any).hash = 'ca880f2c1b88f4a29ab5905c4d9cfb26';
export default node;
