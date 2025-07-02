<script setup>
import DefaultTheme from "vitepress/theme";
import { onContentUpdated } from "vitepress";
import { ref } from "vue";

const { Layout } = DefaultTheme;
const dateNow = new Date().getFullYear();
const showBeian = ref(false);

onContentUpdated(() => {
	showBeian.value = location.hostname == "djgo.cc";
});
</script>

<template>
	<Layout>
		<template #layout-bottom>
			<div>
				<footer class="VPFooter">
					<div class="container">
						<p class="message" v-if="showBeian"><a style="margin-right: 10px" href="https://beian.miit.gov.cn" target="_blank">豫ICP备2022007076号</a> <a style="margin-right: 10px" href="https://beian.miit.gov.cn">豫ICP备2022007076号-1</a> <a href="/docs/other/disclaimer">免责声明</a>`,</p>
						<p class="copyright">Copyright © {{ dateNow }}-present Evan You</p>
					</div>
				</footer>
			</div>
		</template>
	</Layout>
</template>

<style scoped>
.VPFooter {
	position: relative;
	z-index: var(--vp-z-index-footer);
	border-top: 1px solid var(--vp-c-gutter);
	padding: 32px 24px;
	background-color: var(--vp-c-bg);
}

.VPFooter.has-sidebar {
	display: none;
}

.VPFooter :deep(a) {
	text-decoration-line: underline;
	text-underline-offset: 2px;
	transition: color 0.25s;
}

.VPFooter :deep(a:hover) {
	color: var(--vp-c-text-1);
}

@media (min-width: 768px) {
	.VPFooter {
		padding: 32px;
	}
}

.container {
	margin: 0 auto;
	max-width: var(--vp-layout-max-width);
	text-align: center;
}

.message,
.copyright {
	line-height: 24px;
	font-size: 14px;
	font-weight: 500;
	color: var(--vp-c-text-2);
}
</style>
