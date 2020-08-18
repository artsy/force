/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairHeader_QueryVariables = {
    slug: string;
};
export type FairHeader_QueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairHeader_fair">;
    } | null;
};
export type FairHeader_QueryRawResponse = {
    readonly fair: ({
        readonly about: string | null;
        readonly formattedOpeningHours: string | null;
        readonly name: string | null;
        readonly slug: string;
        readonly image: ({
            readonly cropped: ({
                readonly src: string | null;
                readonly width: number | null;
                readonly height: number | null;
            }) | null;
        }) | null;
        readonly tagline: string | null;
        readonly location: ({
            readonly summary: string | null;
            readonly id: string | null;
        }) | null;
        readonly ticketsLink: string | null;
        readonly hours: string | null;
        readonly links: string | null;
        readonly id: string | null;
    }) | null;
};
export type FairHeader_Query = {
    readonly response: FairHeader_QueryResponse;
    readonly variables: FairHeader_QueryVariables;
    readonly rawResponse: FairHeader_QueryRawResponse;
};



/*
query FairHeader_Query(
  $slug: String!
) {
  fair(id: $slug) {
    ...FairHeader_fair
    id
  }
}

fragment FairHeader_fair on Fair {
  about
  formattedOpeningHours
  name
  slug
  image {
    cropped(width: 750, height: 1000, version: "wide") {
      src: url
      width
      height
    }
  }
  tagline
  location {
    summary
    id
  }
  ticketsLink
  hours
  links
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FairHeader_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairHeader_fair"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FairHeader_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "about",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "formattedOpeningHours",
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
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 1000
                  },
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "wide"
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 750
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": [
                  {
                    "alias": "src",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "url",
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
                    "name": "height",
                    "storageKey": null
                  }
                ],
                "storageKey": "cropped(height:1000,version:\"wide\",width:750)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "tagline",
            "storageKey": null
          },
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
                "name": "summary",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "ticketsLink",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hours",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "links",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "FairHeader_Query",
    "operationKind": "query",
    "text": "query FairHeader_Query(\n  $slug: String!\n) {\n  fair(id: $slug) {\n    ...FairHeader_fair\n    id\n  }\n}\n\nfragment FairHeader_fair on Fair {\n  about\n  formattedOpeningHours\n  name\n  slug\n  image {\n    cropped(width: 750, height: 1000, version: \"wide\") {\n      src: url\n      width\n      height\n    }\n  }\n  tagline\n  location {\n    summary\n    id\n  }\n  ticketsLink\n  hours\n  links\n}\n"
  }
};
})();
(node as any).hash = 'af5c0d423dbab8c7879f98b99dd99ebd';
export default node;
