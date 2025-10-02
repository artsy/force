/**
 * @generated SignedSource<<dabb525ff3988717f2e7ec8458ff38f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type articlesRoutes_AuthorQuery$variables = {
  id: string;
};
export type articlesRoutes_AuthorQuery$data = {
  readonly author: {
    readonly " $fragmentSpreads": FragmentRefs<"AuthorApp_author">;
  } | null | undefined;
};
export type articlesRoutes_AuthorQuery = {
  response: articlesRoutes_AuthorQuery$data;
  variables: articlesRoutes_AuthorQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "handle",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "articlesRoutes_AuthorQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Author",
        "kind": "LinkedField",
        "name": "author",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AuthorApp_author"
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
    "name": "articlesRoutes_AuthorQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Author",
        "kind": "LinkedField",
        "name": "author",
        "plural": false,
        "selections": [
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
            "name": "role",
            "storageKey": null
          },
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
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": "description",
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "PLAIN"
              }
            ],
            "kind": "ScalarField",
            "name": "bio",
            "storageKey": "bio(format:\"PLAIN\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AuthorSocials",
            "kind": "LinkedField",
            "name": "socials",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AuthorSocialsX",
                "kind": "LinkedField",
                "name": "x",
                "plural": false,
                "selections": (v2/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "AuthorSocialsInstagram",
                "kind": "LinkedField",
                "name": "instagram",
                "plural": false,
                "selections": (v2/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "bio",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "initials",
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
                    "value": 100
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 100
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "src",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "srcSet",
                    "storageKey": null
                  }
                ],
                "storageKey": "cropped(height:100,width:100)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e9bb89563f83382da940f31e23c3cd0e",
    "id": null,
    "metadata": {},
    "name": "articlesRoutes_AuthorQuery",
    "operationKind": "query",
    "text": "query articlesRoutes_AuthorQuery(\n  $id: String!\n) {\n  author(id: $id) @principalField {\n    ...AuthorApp_author\n    id\n  }\n}\n\nfragment AuthorApp_author on Author {\n  ...AuthorStructuredData_author\n  __typename\n  internalID\n  slug\n  name\n  bio\n  initials\n  role\n  socials {\n    x {\n      handle\n      url\n    }\n    instagram {\n      handle\n      url\n    }\n  }\n  image {\n    cropped(width: 100, height: 100) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment AuthorStructuredData_author on Author {\n  name\n  role\n  internalID\n  slug\n  description: bio(format: PLAIN)\n  socials {\n    x {\n      url\n    }\n    instagram {\n      url\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ec9d492116c508c064298c39fe93c9c7";

export default node;
