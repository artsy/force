/**
 * @generated SignedSource<<9b399c0b44aa92413afae4259db04766>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChannelApp_channel$data = {
  readonly id: string;
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
      "name": "id",
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

(node as any).hash = "c960cb8a74815e58bc61b1ab76f0aede";

export default node;
