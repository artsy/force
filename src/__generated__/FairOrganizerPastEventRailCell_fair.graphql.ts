/**
 * @generated SignedSource<<43b7ea294857c057ec5caf6ecf40c99c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerPastEventRailCell_fair$data = {
  readonly image: {
    readonly cropped: {
      readonly height: number;
      readonly src: string;
      readonly srcSet: string;
      readonly width: number;
    } | null | undefined;
  } | null | undefined;
  readonly name: string | null | undefined;
  readonly slug: string;
  readonly " $fragmentType": "FairOrganizerPastEventRailCell_fair";
};
export type FairOrganizerPastEventRailCell_fair$key = {
  readonly " $data"?: FairOrganizerPastEventRailCell_fair$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairOrganizerPastEventRailCell_fair">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairOrganizerPastEventRailCell_fair",
  "selections": [
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
              "value": 244
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 325
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
              "name": "width",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "height",
              "storageKey": null
            },
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
          "storageKey": "cropped(height:244,width:325)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Fair",
  "abstractKey": null
};

(node as any).hash = "0128a360ad6a3c56c07bfede7f2fbb8f";

export default node;
