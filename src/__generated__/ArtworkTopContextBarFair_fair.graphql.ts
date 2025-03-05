/**
 * @generated SignedSource<<9a7695bdd4893fcd5eb0e0addaebb1bf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkTopContextBarFair_fair$data = {
  readonly href: string | null | undefined;
  readonly name: string | null | undefined;
  readonly profile: {
    readonly icon: {
      readonly url: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ArtworkTopContextBarFair_fair";
};
export type ArtworkTopContextBarFair_fair$key = {
  readonly " $data"?: ArtworkTopContextBarFair_fair$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkTopContextBarFair_fair">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkTopContextBarFair_fair",
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
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "icon",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "url",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Fair",
  "abstractKey": null
};

(node as any).hash = "104345ef9f1ebf896018866a0bf8ad96";

export default node;
