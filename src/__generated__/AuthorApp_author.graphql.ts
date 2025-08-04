/**
 * @generated SignedSource<<35a5f3969b3fe2ced8d22e41a1e2d077>>
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
  readonly " $fragmentType": "AuthorApp_author";
};
export type AuthorApp_author$key = {
  readonly " $data"?: AuthorApp_author$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuthorApp_author">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuthorApp_author",
  "selections": [
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

(node as any).hash = "2527ac5064a0e8ee0e62afa59044d890";

export default node;
