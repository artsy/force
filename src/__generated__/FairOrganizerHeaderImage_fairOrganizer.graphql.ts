/**
 * @generated SignedSource<<befa260b435894bac11574f3d7afc1e4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerHeaderImage_fairOrganizer$data = {
  readonly profile: {
    readonly image: {
      readonly url: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "FairOrganizerHeaderImage_fairOrganizer";
};
export type FairOrganizerHeaderImage_fairOrganizer$key = {
  readonly " $data"?: FairOrganizerHeaderImage_fairOrganizer$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairOrganizerHeaderImage_fairOrganizer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairOrganizerHeaderImage_fairOrganizer",
  "selections": [
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
      "storageKey": null
    }
  ],
  "type": "FairOrganizer",
  "abstractKey": null
};

(node as any).hash = "3fdef7d19c13faad6f174fc62c51b7a5";

export default node;
