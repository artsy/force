/**
 * @generated SignedSource<<4b05cf441ce27ea280eb767306e39646>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeHeroUnit_heroUnit$data = {
  readonly backgroundImageURL: string | null;
  readonly heading: string | null;
  readonly title: string | null;
  readonly subtitle: string | null;
  readonly linkText: string | null;
  readonly href: string | null;
  readonly creditLine: string | null;
  readonly " $fragmentType": "HomeHeroUnit_heroUnit";
};
export type HomeHeroUnit_heroUnit$key = {
  readonly " $data"?: HomeHeroUnit_heroUnit$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeHeroUnit_heroUnit">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeHeroUnit_heroUnit",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "backgroundImageURL",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "heading",
      "storageKey": null
    },
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
      "name": "subtitle",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "linkText",
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
      "kind": "ScalarField",
      "name": "creditLine",
      "storageKey": null
    }
  ],
  "type": "HomePageHeroUnit",
  "abstractKey": null
};

(node as any).hash = "6d2f6ea533765b4f5ada598ac3e75983";

export default node;
