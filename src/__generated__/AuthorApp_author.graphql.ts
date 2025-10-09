/**
 * @generated SignedSource<<a8e3c56469d74664372e3d60787e5c0b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuthorApp_author$data = {
  readonly __typename: "Author";
  readonly bio: string | null | undefined;
  readonly image: {
    readonly cropped: {
      readonly src: string;
      readonly srcSet: string;
    } | null | undefined;
  } | null | undefined;
  readonly initials: string | null | undefined;
  readonly internalID: string;
  readonly name: string;
  readonly role: string | null | undefined;
  readonly slug: string | null | undefined;
  readonly socials: {
    readonly instagram: {
      readonly handle: string;
      readonly url: string;
    } | null | undefined;
    readonly x: {
      readonly handle: string;
      readonly url: string;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"AuthorStructuredData_author">;
  readonly " $fragmentType": "AuthorApp_author";
};
export type AuthorApp_author$key = {
  readonly " $data"?: AuthorApp_author$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuthorApp_author">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "handle",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuthorApp_author",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuthorStructuredData_author"
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
      "kind": "ScalarField",
      "name": "role",
      "storageKey": null
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
          "selections": (v0/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "AuthorSocialsInstagram",
          "kind": "LinkedField",
          "name": "instagram",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        }
      ],
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
    }
  ],
  "type": "Author",
  "abstractKey": null
};
})();

(node as any).hash = "9f3a39d0db2cda3a460e50062a16cb6b";

export default node;
