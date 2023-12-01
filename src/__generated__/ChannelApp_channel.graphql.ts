/**
 * @generated SignedSource<<5991c231c1ec2b40c4470985b5d1efb3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChannelApp_channel$data = {
  readonly image: {
    readonly url: string | null | undefined;
  } | null | undefined;
  readonly links: ReadonlyArray<{
    readonly text: string;
    readonly url: string;
  }>;
  readonly name: string;
  readonly tagline: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ChannelArticles_channel">;
  readonly " $fragmentType": "ChannelApp_channel";
};
export type ChannelApp_channel$key = {
  readonly " $data"?: ChannelApp_channel$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChannelApp_channel">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChannelApp_channel",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChannelArticles_channel"
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
      "name": "tagline",
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
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ChannelLink",
      "kind": "LinkedField",
      "name": "links",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "text",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Channel",
  "abstractKey": null
};
})();

(node as any).hash = "6fe32a16ec30d9c06b7039d4b6be6685";

export default node;
