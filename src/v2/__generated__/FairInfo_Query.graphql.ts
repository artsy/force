/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairInfo_QueryVariables = {
    slug: string;
};
export type FairInfo_QueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairInfo_fair">;
    } | null;
};
export type FairInfo_QueryRawResponse = {
    readonly fair: ({
        readonly about: string | null;
        readonly name: string | null;
        readonly slug: string;
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
export type FairInfo_Query = {
    readonly response: FairInfo_QueryResponse;
    readonly variables: FairInfo_QueryVariables;
    readonly rawResponse: FairInfo_QueryRawResponse;
};



/*
query FairInfo_Query(
  $slug: String!
) {
  fair(id: $slug) {
    ...FairInfo_fair
    id
  }
}

fragment FairInfo_fair on Fair {
  about
  name
  slug
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
    "name": "FairInfo_Query",
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
            "name": "FairInfo_fair"
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
    "name": "FairInfo_Query",
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
    "name": "FairInfo_Query",
    "operationKind": "query",
    "text": "query FairInfo_Query(\n  $slug: String!\n) {\n  fair(id: $slug) {\n    ...FairInfo_fair\n    id\n  }\n}\n\nfragment FairInfo_fair on Fair {\n  about\n  name\n  slug\n  tagline\n  location {\n    summary\n    id\n  }\n  ticketsLink\n  hours\n  links\n}\n"
  }
};
})();
(node as any).hash = 'eb54ecc0bc4103280559443acbcf0ae1';
export default node;
