/**
 * @generated SignedSource<<3b0389a7d1eace723fe7accc3aa45f38>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuthorStructuredData_author$data = {
  readonly description: string | null | undefined;
  readonly internalID: string;
  readonly name: string;
  readonly role: string | null | undefined;
  readonly slug: string | null | undefined;
  readonly socials: {
    readonly instagram: {
      readonly url: string;
    } | null | undefined;
    readonly x: {
      readonly url: string;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "AuthorStructuredData_author";
};
export type AuthorStructuredData_author$key = {
  readonly " $data"?: AuthorStructuredData_author$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuthorStructuredData_author">;
};

const node: ReaderFragment = (function(){
var v0 = [
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
  "name": "AuthorStructuredData_author",
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
    }
  ],
  "type": "Author",
  "abstractKey": null
};
})();

(node as any).hash = "4bc525fb4e4966344ff1f63ada59c524";

export default node;
