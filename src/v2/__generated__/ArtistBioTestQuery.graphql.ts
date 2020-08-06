/* tslint:disable */

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
            readonly text: string | null;
        }) | null;
        readonly id: string | null;
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
  biographyBlurb(format: HTML, partnerBio: true) {
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
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtistBioTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "bio",
        "name": "artist",
        "storageKey": "artist(id:\"unused\")",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtistBio_bio",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtistBioTestQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "bio",
        "name": "artist",
        "storageKey": "artist(id:\"unused\")",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "biographyBlurb",
            "storageKey": "biographyBlurb(format:\"HTML\",partnerBio:true)",
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              },
              {
                "kind": "Literal",
                "name": "partnerBio",
                "value": true
              }
            ],
            "concreteType": "ArtistBlurb",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "text",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtistBioTestQuery",
    "id": null,
    "text": "query ArtistBioTestQuery {\n  bio: artist(id: \"unused\") {\n    ...ArtistBio_bio\n    id\n  }\n}\n\nfragment ArtistBio_bio on Artist {\n  biographyBlurb(format: HTML, partnerBio: true) {\n    text\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'b0bfe8de06ea988344d1c91d36e66bfd';
export default node;
