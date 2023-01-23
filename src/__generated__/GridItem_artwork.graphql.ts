/**
 * @generated SignedSource<<84440e33fb139cac4e9cd3727d729f53>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GridItem_artwork$data = {
  readonly artistNames: string | null;
  readonly href: string | null;
  readonly image: {
    readonly aspectRatio: number;
    readonly internalID: string | null;
    readonly placeholder: string | null;
    readonly url: string | null;
  } | null;
  readonly imageTitle: string | null;
  readonly internalID: string;
  readonly title: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"Badge_artwork" | "Metadata_artwork" | "SaveButton_artwork">;
  readonly " $fragmentType": "GridItem_artwork";
};
export type GridItem_artwork$key = {
  readonly " $data"?: GridItem_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"GridItem_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "includeAllImages"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "GridItem_artwork",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "imageTitle",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "includeAll",
          "variableName": "includeAllImages"
        }
      ],
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "placeholder",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "larger",
                "large"
              ]
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:[\"larger\",\"large\"])"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "aspectRatio",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artistNames",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "Metadata_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SaveButton_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Badge_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "81e7fe3ffc04b57251dcd4477d90a9d6";

export default node;
