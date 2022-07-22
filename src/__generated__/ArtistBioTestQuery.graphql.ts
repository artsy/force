/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistBioTestQueryVariables = {};
export type ArtistBioTestQueryResponse = {
    readonly bio: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistBio_bio">;
    } | null;
};
export type ArtistBioTestQueryRawResponse = {
    readonly bio: ({
        readonly biographyBlurb: ({
            readonly credit: string | null;
            readonly partnerID: string | null;
            readonly text: string | null;
        }) | null;
        readonly id: string;
    }) | null;
};
export type ArtistBioTestQuery = {
    readonly response: ArtistBioTestQueryResponse;
    readonly variables: ArtistBioTestQueryVariables;
    readonly rawResponse: ArtistBioTestQueryRawResponse;
};



/*
query ArtistBioTestQuery {
  bio: artist(id: "unused") {
    ...ArtistBio_bio
    id
  }
}

fragment ArtistBio_bio on Artist {
  biographyBlurb(format: HTML, partnerBio: false) {
    credit
    partnerID
    text
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "unused"
  }
],
v1 = {
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
    "name": "ArtistBioTestQuery",
    "selections": [
      {
        "alias": "bio",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistBio_bio"
          }
        ],
        "storageKey": "artist(id:\"unused\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistBioTestQuery",
    "selections": [
      {
        "alias": "bio",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              },
              {
                "kind": "Literal",
                "name": "partnerBio",
                "value": false
              }
            ],
            "concreteType": "ArtistBlurb",
            "kind": "LinkedField",
            "name": "biographyBlurb",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "credit",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "partnerID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "text",
                "storageKey": null
              }
            ],
            "storageKey": "biographyBlurb(format:\"HTML\",partnerBio:false)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "artist(id:\"unused\")"
      }
    ]
  },
  "params": {
    "cacheID": "05ebe8eb11518db5711bac9b45daaf90",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "bio": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "bio.biographyBlurb": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistBlurb"
        },
        "bio.biographyBlurb.credit": (v1/*: any*/),
        "bio.biographyBlurb.partnerID": (v1/*: any*/),
        "bio.biographyBlurb.text": (v1/*: any*/),
        "bio.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        }
      }
    },
    "name": "ArtistBioTestQuery",
    "operationKind": "query",
    "text": "query ArtistBioTestQuery {\n  bio: artist(id: \"unused\") {\n    ...ArtistBio_bio\n    id\n  }\n}\n\nfragment ArtistBio_bio on Artist {\n  biographyBlurb(format: HTML, partnerBio: false) {\n    credit\n    partnerID\n    text\n  }\n}\n"
  }
};
})();
(node as any).hash = '3f1ee721b84fbe1f4678f268c11573b3';
export default node;
