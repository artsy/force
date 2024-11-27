/**
 * @generated SignedSource<<7917793137b31f8c8680ddcfb859129f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerHeaderImage_profile$data = {
  readonly image: {
    readonly url: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "PartnerHeaderImage_profile";
};
export type PartnerHeaderImage_profile$key = {
  readonly " $data"?: PartnerHeaderImage_profile$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnerHeaderImage_profile">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerHeaderImage_profile",
  "selections": [
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
              "name": "version",
              "value": "wide"
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:\"wide\")"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Profile",
  "abstractKey": null
};

(node as any).hash = "2892c6c4bdbfac989e8badf63f150514";

export default node;
